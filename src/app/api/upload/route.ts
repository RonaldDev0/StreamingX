import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import ffmpeg from 'fluent-ffmpeg'
import { writeFileSync, readFileSync, unlinkSync, mkdirSync } from 'fs'
import path from 'path'

// Function that wraps ffmpeg conversion in a Promise
function convertToFaststart (inputPath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c copy',
        '-movflags faststart'
      ])
      .output(outputPath)
      .on('error', (err) => {
        reject(err)
      })
      .on('end', () => {
        resolve()
      })
      .run()
  })
}

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
} as any)

export async function POST (req: NextRequest) {
  try {
    const form = await req.formData()

    const file = form.get('file') as Blob | null
    const title = form.get('title') as string | null
    const description = form.get('description') as string | null
    const author = form.get('author') as string | null

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    if (!title || !description || !author) {
      return NextResponse.json({ error: 'No metadata uploaded' }, { status: 400 })
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Define temporary routes
    const tempDir = 'src/temps'
    mkdirSync(tempDir, { recursive: true })
    const inputFilePath = path.join(tempDir, `${Date.now()}_input.mp4`)
    // We use another timestamp for the output (you could also base it on the same value)
    const outputFilePath = path.join(tempDir, `${Date.now()}_faststart.mp4`)

    // Save the original file to disk
    writeFileSync(inputFilePath, buffer)

    // Run faststart MP4 conversion
    await convertToFaststart(inputFilePath, outputFilePath)

    // Read the converted file
    const outputBuffer = readFileSync(outputFilePath)
    const fileName = `${Date.now().toString()}.mp4`

    // Upload to Cloudflare R2
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: outputBuffer,
        ContentType: 'video/mp4',
        Metadata: {
          title,
          description,
          author
        }
      })
    )

    // Clean temporary files
    unlinkSync(inputFilePath)
    unlinkSync(outputFilePath)

    return NextResponse.json({ success: true, fileName })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

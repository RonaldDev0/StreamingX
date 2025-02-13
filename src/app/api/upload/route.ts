import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import ffmpeg from 'fluent-ffmpeg'
import { writeFileSync, readFileSync, unlinkSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { supabase } from '../supabase'

function convertToFaststart (inputPath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions(['-c copy', '-movflags faststart'])
      .output(outputPath)
      .on('error', (err) => reject(err))
      .on('end', () => resolve())
      .run()
  })
}

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  }
})

export async function POST (req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as Blob
    const title = form.get('title') as string
    const description = form.get('description') as string
    const author = form.get('author') as string
    const thumbnailFile = form.get('thumbnail') as File | null

    if (!file || !title || !description || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create temp directory
    const tempDir = path.join(process.cwd(), 'public', 'temps')
    mkdirSync(tempDir, { recursive: true })

    // File paths
    const inputFilePath = path.join(tempDir, 'input.mp4')
    const outputFilePath = path.join(tempDir, 'output.mp4')

    // Write input file
    const buffer = Buffer.from(await file.arrayBuffer())
    writeFileSync(inputFilePath, buffer)

    // Convert video
    await convertToFaststart(inputFilePath, outputFilePath)

    // Verify conversion
    if (!existsSync(outputFilePath)) {
      throw new Error('FFmpeg conversion failed')
    }

    // Read output file
    const outputBuffer = readFileSync(outputFilePath)
    const randomName = randomUUID()
    const fileName = `${randomName}.mp4`

    // Upload to R2
    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: outputBuffer,
      ContentType: 'video/mp4',
      Metadata: { title, description, author }
    }))

    // Get duration BEFORE deleting files
    const duration = await new Promise<number>((resolve, reject) => {
      ffmpeg.ffprobe(outputFilePath, (err, metadata) => {
        if (err || !metadata?.format?.duration) {
          reject(err || new Error('Could not get duration'))
        } else {
          resolve(Math.round(metadata.format.duration))
        }
      })
    })

    // Delete temp files
    unlinkSync(inputFilePath)
    unlinkSync(outputFilePath)

    // Handle thumbnail
    let thumbnailPath = null
    if (thumbnailFile) {
      const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer())
      const extension = thumbnailFile.name.split('.')[1]
      const thumbnailName = `${randomName}.${extension}`

      const { data, error } = await supabase
        .storage
        .from('thumbnails')
        .upload(thumbnailName, thumbnailBuffer)

      if (error || !data.path) {
        console.error({ error, data })
        return
      }
      thumbnailPath = data.path
    }


    // Insert to Supabase
    const tags = (form.get('tags')?.toString() || '').split(/\s+/).filter(Boolean)

    await supabase
      .from('videos')
      .insert({
        key: randomName,
        thumbnail: thumbnailPath,
        duration,
        author_id: author,
        title,
        description,
        tags,
        status: 'published'
      })

    return NextResponse.json({ success: true, fileName })

  } catch (error) {
    console.error('Error in POST /api/upload:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
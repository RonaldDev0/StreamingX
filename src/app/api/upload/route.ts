import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

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

    if (!title || !description || !author) return NextResponse.json({ error: 'No metadata uploaded' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = Date.now().toString()

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          title,
          description,
          author
        }
      })
    )

    return NextResponse.json({ success: true, fileName })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
'use client'
import { useState, useRef, useEffect } from 'react'
import { Input, Textarea, Button, Card } from '@heroui/react'
import { Cloud, Edit } from 'lucide-react'
import Image from 'next/image'
import { useUser } from '@/store'

export default function UploadPage () {
  const { user } = useUser()

  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setVideoFile(file)
      generateThumbnail(file)
    }
  }

  const generateThumbnail = (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    if (videoRef.current) {
      videoRef.current.src = objectUrl
      videoRef.current.onloadeddata = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
        }
        setTimeout(() => {
          const canvas = document.createElement('canvas')
          // Ajustamos las dimensiones del canvas según el tamaño del video
          canvas.width = videoRef.current?.videoWidth || 526
          canvas.height = videoRef.current?.videoHeight || 263
          const context = canvas.getContext('2d')
          if (context && videoRef.current) {
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL()
            setVideoThumbnail(dataUrl)
          }
        }, 100)
      }
    }
  }

  const handleReplaceFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!videoFile || !user?.id) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', videoFile)
    formData.append('title', videoTitle)
    formData.append('description', videoDescription)
    formData.append('author', user.id)
    formData.append('thumbnail', '')
    formData.append('tags', '')

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (res.ok) {
          alert('video subido!!')
        } else {
          alert('error al subir el video')
        }
        setUploading(false)
      })
  }

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        URL.revokeObjectURL(videoRef.current.src)
      }
    }
  }, [])

  return (
    <main className='flex justify-center items-center w-screen z-20 left-0 top-0 fixed h-screen'>
      <Card className='w-full max-w-xl p-6'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          Upload Your Video
        </h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <div className='relative'>
              <div
                className='w-[526px] h-[263px] bg-[#27272A] border border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer'
                onClick={handleReplaceFile}
              >
                {videoThumbnail ? (
                  <Image
                    width='526'
                    height='263'
                    src={videoThumbnail}
                    alt='Video Thumbnail'
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <span className='text-gray-500'>Click to select a video</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                id='videoFile'
                type='file'
                accept='video/*'
                onChange={handleFileChange}
                className='hidden'
              />
            </div>
            {videoFile && (
              <div className='mt-2'>
                <Button
                  type='button'
                  onPress={handleReplaceFile}
                  className='w-full'
                >
                  <Edit size={16} className='mr-2' />
                  Replace Video
                </Button>
              </div>
            )}
          </div>
          <div className='space-y-3'>
            <Input
              label='Video Title'
              id='videoTitle'
              type='text'
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              placeholder='Enter your video title'
            />
            <Textarea
              label='Video Description'
              id='videoDescription'
              value={videoDescription}
              onChange={e => setVideoDescription(e.target.value)}
              placeholder='Describe your video'
              rows={3}
            />
          </div>
          <Button
            type='submit'
            color='primary'
            className='w-full'
            disabled={uploading}
          >
            <Cloud size={18} className='mr-2' />
            {uploading ? 'Subiendo...' : 'Upload Video'}
          </Button>
        </form>
      </Card>
      <video ref={videoRef} className='hidden' />
    </main>
  )
}
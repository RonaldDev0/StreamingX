'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Maximize, Minimize, VolumeX, Volume, Volume1, Volume2 } from 'lucide-react'
import { Slider } from '@heroui/react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VideoContent ({ id }: { id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0.1)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleVolumeChange = (value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err)
      }
    } else {
      try {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err)
      }
    }
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={30} />
    if (volume < 0.33) return <Volume size={30} />
    if (volume < 0.67) return <Volume1 size={30} />
    return <Volume2 size={30} />
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTimeUpdate = () => {
      setProgress(video.currentTime)
      setDuration(video.duration || 0.1)
    }
    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value
    if (videoRef.current) {
      videoRef.current.currentTime = newValue
      setProgress(newValue)
    }
  }

  function formatTime (seconds: number): string {
    if (!isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1280px] aspect-video rounded-xl overflow-hidden shadow-lg bg-black ${
        isFullscreen ? 'max-w-none rounded-none' : ''
      }`}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => {
        setControlsVisible(false)
        setShowVolumeSlider(false)
      }}
    >
      <video
        ref={videoRef}
        src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        className='w-full h-full object-cover'
      />
      <div className='absolute top-0 left-0 right-0 bottom-0' onClick={handlePlayPause} />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-all bg-gray-700 bg-opacity-50 duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='flex justify-between items-center gap-4'>
          <p className='w-16 text-white'>{formatTime(progress)}</p>
          <div className={`flex-grow transition-all ${isFullscreen ? 'h-4' : 'h-2'}`}>
            {duration > 0 && (
              <Slider
                value={progress}
                minValue={0}
                maxValue={duration}
                step={0.1}
                onChange={handleSliderChange}
                showTooltip
                className={`w-full ${isFullscreen ? 'h-4' : 'h-2'}`}
              />
            )}
          </div>
          <p className='w-16 text-white'>{formatTime(duration)}</p>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center gap-4 w-40'>
            <div
              className='cursor-pointer text-white'
              onMouseEnter={() => setShowVolumeSlider(true)}
              onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
            >
              {getVolumeIcon()}
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                showVolumeSlider ? 'w-36' : 'w-0'
              }`}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <Slider
                value={volume}
                minValue={0}
                maxValue={1}
                step={0.01}
                onChange={handleVolumeChange}
                className='w-28'
              />
            </div>
          </div>
          <div className='cursor-pointer text-white w-40' onClick={handlePlayPause}>
            {playing ? <Pause size={30} /> : <Play size={30} />}
          </div>
          <div className='cursor-pointer text-white' onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={30} /> : <Maximize size={30} />}
          </div>
        </div>
      </div>
    </div>
  )
}
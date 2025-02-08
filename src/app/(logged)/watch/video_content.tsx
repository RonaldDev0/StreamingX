'use client'
import React, { useRef, useState, useEffect, useCallback, memo, useMemo } from 'react'
import { Play, Pause, Maximize, Minimize, VolumeX, Volume, Volume1, Volume2 } from 'lucide-react'
import { Slider } from '@heroui/react'

const formatTime = (seconds: number): string => {
  if (!isFinite(seconds)) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function VolumeIconComponent ({ volume }: { volume: number }) {
  if (volume === 0) return <VolumeX size={30} />
  if (volume < 0.33) return <Volume size={30} />
  if (volume < 0.67) return <Volume1 size={30} />
  return <Volume2 size={30} />
}

const VolumeIcon = memo(VolumeIconComponent)
VolumeIcon.displayName = 'VolumeIcon'

interface PlayerState {
  playing: boolean
  controlsVisible: boolean
  progress: number
  duration: number
  volume: number
  isFullscreen: boolean
  showVolumeSlider: boolean
}

const initialState: PlayerState = {
  playing: true,
  controlsVisible: false,
  progress: 0,
  duration: 0.1,
  volume: 1,
  isFullscreen: false,
  showVolumeSlider: false
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const VideoContent = memo(({ id }: { id: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const initialPlayDone = useRef(false)
  const [playerState, setPlayerState] = useState<PlayerState>(initialState)

  const updatePlayerState = useCallback((updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }))
  }, [])

  // Initial autoplay setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleInitialPlay = () => {
      if (!initialPlayDone.current) {
        video.muted = false
        video.volume = playerState.volume
        initialPlayDone.current = true
      }
    }

    video.addEventListener('playing', handleInitialPlay)
    return () => video.removeEventListener('playing', handleInitialPlay)
  }, [playerState.volume])

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    if (playerState.playing) {
      video.pause()
    } else {
      video.play().then(() => {
        if (!initialPlayDone.current) {
          video.muted = false
          video.volume = playerState.volume
          initialPlayDone.current = true
        }
      })
    }
    updatePlayerState({ playing: !playerState.playing })
  }, [playerState.playing, playerState.volume, updatePlayerState])

  const handleVolumeChange = useCallback((value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
      updatePlayerState({ volume: newVolume })
    }
  }, [updatePlayerState])

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        updatePlayerState({ isFullscreen: true })
      } else {
        await document.exitFullscreen()
        updatePlayerState({ isFullscreen: false })
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }, [updatePlayerState])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      updatePlayerState({
        progress: video.currentTime,
        duration: video.duration || 0.1
      })
    }

    const handleLoadedMetadata = () => {
      updatePlayerState({ duration: video.duration })
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [updatePlayerState])

  useEffect(() => {
    const handleFullscreenChange = () => {
      updatePlayerState({ isFullscreen: !!document.fullscreenElement })
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [updatePlayerState])

  const sliderProps = useMemo(() => ({
    showTooltip: true,
    className: 'w-full',
    step: 0.1
  }), [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1280px] aspect-video rounded-xl overflow-hidden shadow-lg bg-black ${
        playerState.isFullscreen ? 'max-w-none rounded-none' : ''
      }`}
      onMouseEnter={() => updatePlayerState({ controlsVisible: true })}
      onMouseLeave={() => updatePlayerState({ controlsVisible: false, showVolumeSlider: false })}
    >
      <video
        ref={videoRef}
        src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        className='w-full h-full object-cover'
        autoPlay
        muted
        playsInline
      />
      <div className='absolute top-0 left-0 right-0 bottom-0' onClick={handlePlayPause} />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-all bg-gray-700 bg-opacity-50 duration-300 ${
          playerState.controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='flex justify-between gap-4'>
          <p className='w-16 text-white'>{formatTime(playerState.progress)}</p>
          <div className='flex-grow transition-all'>
            {playerState.duration > 0 && (
              <Slider
                {...sliderProps}
                value={playerState.progress}
                minValue={0}
                maxValue={playerState.duration}
                onChange={(value) => {
                  const newValue = Array.isArray(value) ? value[0] : value
                  if (videoRef.current) {
                    videoRef.current.currentTime = newValue
                    updatePlayerState({ progress: newValue })
                  }
                }}
                tooltipProps={{ content: formatTime(playerState.progress) }}
              />
            )}
          </div>
          <p className='w-16 text-white'>{formatTime(playerState.duration)}</p>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <div
            className='flex items-center gap-4 w-40'
            onMouseEnter={() => updatePlayerState({ showVolumeSlider: true })}
          >
            <div
              className='cursor-pointer text-white'
              onClick={() => handleVolumeChange(playerState.volume === 0 ? 1 : 0)}
            >
              <VolumeIcon volume={playerState.volume} />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                playerState.showVolumeSlider ? 'w-36' : 'w-0'
              }`}
              onMouseLeave={() => updatePlayerState({ showVolumeSlider: false })}
            >
              <Slider
                value={playerState.volume}
                minValue={0}
                maxValue={1}
                step={0.01}
                onChange={handleVolumeChange}
                className='w-28'
                showTooltip
                tooltipProps={{ content: `${Math.round(playerState.volume * 100)}%` }}
              />
            </div>
          </div>
          <div className='cursor-pointer text-white w-40' onClick={handlePlayPause}>
            {playerState.playing ? <Pause size={30} /> : <Play size={30} />}
          </div>
          <div className='cursor-pointer text-white' onClick={toggleFullscreen}>
            {playerState.isFullscreen ? <Minimize size={30} /> : <Maximize size={30} />}
          </div>
        </div>
      </div>
    </div>
  )
})

VideoContent.displayName = 'VideoContent'
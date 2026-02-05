import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

// Create a GLOBAL audio instance outside of React component lifecycle
let globalAudio = null
let globalAudioInitialized = false

const initializeGlobalAudio = () => {
    if (!globalAudioInitialized) {
        globalAudio = new Audio('/ordinary.mp3')
        globalAudio.loop = true
        globalAudio.volume = 0.25
        globalAudioInitialized = true
    }
    return globalAudio
}

export const useMusic = () => {
    const context = useContext(MusicContext)
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider')
    }
    return context
}

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(initializeGlobalAudio())
    const [isPlaying, setIsPlaying] = useState(() => {
        // Initialize from localStorage or check if audio is playing
        const savedState = localStorage.getItem('music_is_playing')
        return savedState === 'true' || false
    })
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('music_volume')
        return savedVolume ? parseFloat(savedVolume) : 0.25
    })

    useEffect(() => {
        const audio = audioRef.current

        // Event listeners
        const handleLoadedMetadata = () => {
            setDuration(audio.duration)
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        const handleEnded = () => {
            setIsPlaying(false)
            localStorage.setItem('music_is_playing', 'false')
        }

        const handlePlay = () => {
            setIsPlaying(true)
            localStorage.setItem('music_is_playing', 'true')
        }

        const handlePause = () => {
            setIsPlaying(false)
            localStorage.setItem('music_is_playing', 'false')
        }

        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)

        // Auto-play on first visit
        const hasAutoPlayed = localStorage.getItem('music_auto_played')
        if (!hasAutoPlayed) {
            setTimeout(() => {
                audio.play()
                    .then(() => {
                        localStorage.setItem('music_auto_played', 'true')
                        localStorage.setItem('music_is_playing', 'true')
                    })
                    .catch(err => {
                        console.log('Auto-play prevented by browser. User can manually start.', err)
                    })
            }, 500)
        } else if (isPlaying && audio.paused) {
            // Resume if it was playing before navigation
            audio.play().catch(err => console.log('Resume failed:', err))
        }

        // Cleanup event listeners (but NOT the audio element)
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
            localStorage.setItem('music_volume', volume.toString())
        }
    }, [volume])

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true)
                    localStorage.setItem('music_is_playing', 'true')
                })
                .catch(err => console.error('Play failed:', err))
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
            localStorage.setItem('music_is_playing', 'false')
        }
    }

    const togglePlay = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const changeVolume = (newVolume) => {
        setVolume(Math.max(0, Math.min(1, newVolume)))
    }

    const value = {
        isPlaying,
        currentTime,
        duration,
        volume,
        play,
        pause,
        togglePlay,
        seek,
        changeVolume
    }

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

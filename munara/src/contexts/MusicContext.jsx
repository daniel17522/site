import { createContext, useContext, useState, useRef, useEffect } from 'react'

const MusicContext = createContext()

export const useMusic = () => {
    const context = useContext(MusicContext)
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider')
    }
    return context
}

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.5)

    useEffect(() => {
        // Create audio element
        if (!audioRef.current) {
            audioRef.current = new Audio('/ordinary.mp3')
            audioRef.current.loop = true
            audioRef.current.volume = volume

            // Event listeners
            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current.duration)
            })

            audioRef.current.addEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current.currentTime)
            })

            audioRef.current.addEventListener('ended', () => {
                setIsPlaying(false)
            })
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.error('Play failed:', err))
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
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

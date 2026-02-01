import { useState, useEffect, useCallback } from 'react'

// Simple sound hook using Web Audio API
export const useSound = () => {
    const [isMuted, setIsMuted] = useState(false)
    const [audioContext, setAudioContext] = useState(null)

    useEffect(() => {
        // Create audio context on mount
        const context = new (window.AudioContext || window.webkitAudioContext)()
        setAudioContext(context)

        return () => {
            if (context) {
                context.close()
            }
        }
    }, [])

    // Play a simple beep sound
    const playSound = useCallback((frequency = 440, duration = 200) => {
        if (isMuted || !audioContext) return

        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration / 1000)
    }, [isMuted, audioContext])

    // Play success sound
    const playSuccess = useCallback(() => {
        playSound(523, 100) // C5
        setTimeout(() => playSound(659, 100), 100) // E5
        setTimeout(() => playSound(784, 200), 200) // G5
    }, [playSound])

    // Play tap sound
    const playTap = useCallback(() => {
        playSound(880, 50) // A5
    }, [playSound])

    // Play collect sound
    const playCollect = useCallback(() => {
        playSound(1047, 100) // C6
    }, [playSound])

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev)
    }, [])

    return {
        isMuted,
        toggleMute,
        playSound,
        playSuccess,
        playTap,
        playCollect
    }
}

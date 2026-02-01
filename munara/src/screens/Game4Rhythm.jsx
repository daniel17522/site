import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'
import { useSound } from '../hooks/useSound'
import Button from '../components/Button'

const BEATS = 12
const BEAT_INTERVAL = 600 // ms
const HIT_WINDOW = 200 // ms tolerance

export default function Game4Rhythm() {
    const navigate = useNavigate()
    const { playTap, isMuted, toggleMute } = useSound()
    const [currentBeat, setCurrentBeat] = useState(0)
    const [hits, setHits] = useState(0)
    const [beatPositions, setBeatPositions] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const interval = setInterval(() => {
            setCurrentBeat(prev => {
                if (prev >= BEATS - 1) {
                    setGameOver(true)
                    return prev
                }
                return prev + 1
            })
        }, BEAT_INTERVAL)

        return () => clearInterval(interval)
    }, [gameStarted, gameOver])

    const handleTap = () => {
        if (!gameStarted || gameOver) return

        playTap()

        // Check if tap is within timing window
        const beatProgress = (Date.now() % BEAT_INTERVAL) / BEAT_INTERVAL
        const isOnBeat = beatProgress < (HIT_WINDOW / BEAT_INTERVAL) ||
            beatProgress > (1 - HIT_WINDOW / BEAT_INTERVAL)

        if (isOnBeat) {
            setHits(prev => prev + 1)
            setBeatPositions(prev => [...prev, currentBeat])
        }
    }

    const startGame = () => {
        setGameStarted(true)
    }

    const handleContinue = () => {
        navigate('/cinematic')
    }

    return (
        <div className="screen" style={{ background: 'linear-gradient(135deg, #e5d4ff 0%, #ffd4a3 100%)' }}>
            <div className="screen-content">
                {/* Mute toggle */}
                <motion.button
                    {...animations.fadeIn}
                    onClick={toggleMute}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-lg)',
                        right: 'var(--space-lg)',
                        background: 'rgba(255, 255, 255, 0.7)',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        width: '48px',
                        height: '48px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                >
                    {isMuted ? '🔇' : '🔊'}
                </motion.button>

                {!gameStarted ? (
                    <motion.div {...animations.scaleIn} className="text-center">
                        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>
                            Найди правильный ритм 🎵
                        </h2>
                        <p style={{
                            fontSize: 'var(--text-lg)',
                            color: 'var(--color-text-light)',
                            marginBottom: 'var(--space-xl)'
                        }}>
                            Нажимай в такт анимации
                        </p>

                        <motion.div
                            {...animations.pulse}
                            style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto var(--space-xl)',
                                background: 'var(--gradient-primary)',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem'
                            }}
                        >
                            💖
                        </motion.div>

                        <Button onClick={startGame}>
                            Начать 🎵
                        </Button>
                    </motion.div>
                ) : !gameOver ? (
                    <motion.div {...animations.fadeIn} className="text-center">
                        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>
                            Попаданий: {hits} / {BEATS}
                        </h2>

                        {/* Beat indicator */}
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: 'var(--space-lg)'
                            }}>
                                {[...Array(BEATS)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: currentBeat === i ? [1, 1.5, 1] : 1,
                                            opacity: i <= currentBeat ? 1 : 0.3
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: beatPositions.includes(i) ? 'var(--color-primary)' : 'var(--color-text-light)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tap button */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1]
                            }}
                            transition={{
                                duration: BEAT_INTERVAL / 1000,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <button
                                onClick={handleTap}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-primary)',
                                    border: 'none',
                                    fontSize: '4rem',
                                    cursor: 'pointer',
                                    boxShadow: 'var(--shadow-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                TAP
                            </button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div {...animations.scaleIn} className="text-center">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 1 }}
                            style={{ fontSize: '5rem', marginBottom: 'var(--space-lg)' }}
                        >
                            🎉
                        </motion.div>

                        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>
                            Отличный ритм!
                        </h2>

                        <p style={{
                            fontSize: 'var(--text-xl)',
                            color: 'var(--color-text-light)',
                            marginBottom: 'var(--space-xl)'
                        }}>
                            Попаданий: {hits} из {BEATS}
                        </p>

                        <Button onClick={handleContinue}>
                            Продолжить ✨
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

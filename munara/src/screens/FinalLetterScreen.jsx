import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storage } from '../utils/storage'

export default function FinalLetterScreen() {
    const navigate = useNavigate()
    const [showPause, setShowPause] = useState(true)
    const [showLetter, setShowLetter] = useState(false)
    const userChoice = storage.getUserChoice()

    useEffect(() => {
        if (showPause) {
            const timer = setTimeout(() => {
                setShowPause(false)
                setShowLetter(true)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [showPause])

    const handleBackToHub = () => {
        window.location.href = '/hub'
    }

    // Pre-letter pause
    if (showPause) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    background: ['#0a0a0a', '#1a1a1a', '#0f0f0f']
                }}
                transition={{
                    opacity: { duration: 1 },
                    background: { duration: 5 }
                }}
                className="screen"
                style={{
                    background: '#0a0a0a'
                }}
            >
                <div className="screen-content text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 2 }}
                        style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            color: 'rgba(255, 182, 193, 0.6)',
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line'
                        }}
                    >
                        Ты дошла до конца.{'\n'}Но это не было целью.
                    </motion.h2>
                </div>
            </motion.div>
        )
    }

    // Actual letter
    if (showLetter) {
        return (
            <div
                className="screen"
                style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a15 100%)',
                    padding: '2rem',
                    overflowY: 'auto'
                }}
            >
                {/* Pink glow */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <div className="screen-content" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Decorative elements */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            textAlign: 'center',
                            fontSize: '4rem',
                            marginBottom: '2rem',
                            filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.5))'
                        }}
                    >
                        💌
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 2 }}
                    >
                        {/* Letter content */}
                        <div
                            style={{
                                fontSize: '1rem',
                                fontFamily: 'var(--font-primary)',
                                color: '#ffb6c1',
                                lineHeight: 1.8,
                                marginBottom: '3rem'
                            }}
                        >
                            <p style={{ marginBottom: '1.5rem', color: '#ff9ec5' }}>
                                Munara,
                            </p>


                            <p style={{ marginBottom: '1.5rem' }}>
                                Тут будет текст
                            </p>


                        </div>

                        {/* Floating hearts decoration */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 3 + i,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                style={{
                                    position: 'absolute',
                                    right: `${10 + i * 15}%`,
                                    top: `${30 + i * 20}%`,
                                    fontSize: '1.5rem',
                                    opacity: 0.3,
                                    pointerEvents: 'none'
                                }}
                            >
                                💕
                            </motion.div>
                        ))}

                        {/* Back button */}
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 107, 157, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBackToHub}
                                style={{
                                    background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9ec5 100%)',
                                    border: 'none',
                                    borderRadius: '50px',
                                    padding: '15px 40px',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontFamily: 'var(--font-primary)',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(255, 107, 157, 0.3)'
                                }}
                            >
                                Вернуться
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    }

    return null
}

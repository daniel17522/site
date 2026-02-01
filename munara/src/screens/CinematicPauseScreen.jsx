import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

export default function CinematicPauseScreen() {
    const navigate = useNavigate()
    const [showButton, setShowButton] = useState(false)
    const [showDot, setShowDot] = useState(false)

    useEffect(() => {
        // Wait 7 seconds before showing text
        const textTimer = setTimeout(() => {
            setShowButton(true)
        }, 7000)

        // Show dot 5 seconds after text
        const dotTimer = setTimeout(() => {
            setShowDot(true)
        }, 12000)

        return () => {
            clearTimeout(textTimer)
            clearTimeout(dotTimer)
        }
    }, [])

    const handleContinue = () => {
        completeCard(CARDS.SILENCE)
        window.location.href = '/hub'
    }

    return (
        <div
            className="screen"
            style={{
                background: '#0a0a0a',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Subtle water-like gradient glow */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(107, 182, 255, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }}
            />

            <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                {/* Text appears after 7 seconds */}
                {showButton && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                    >
                        <h2
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: '#b6d4ff',
                                lineHeight: 1.8,
                                marginBottom: '3rem'
                            }}
                        >
                            Ты никуда не опаздываешь.
                        </h2>
                    </motion.div>
                )}

                {/* Hidden dot appears 5 seconds after text */}
                {showDot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ duration: 2 }}
                        onClick={handleContinue}
                        style={{
                            position: 'absolute',
                            bottom: '5%',
                            right: '5%',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'rgba(182, 212, 255, 0.5)',
                            cursor: 'pointer',
                            boxShadow: '0 0 10px rgba(182, 212, 255, 0.3)'
                        }}
                    />
                )}
            </div>
        </div>
    )
}

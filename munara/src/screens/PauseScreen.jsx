import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'

const PAUSE_DURATION = 4000 // 4 seconds

export default function PauseScreen() {
    const navigate = useNavigate()
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, PAUSE_DURATION)

        return () => clearTimeout(timer)
    }, [])

    const handleContinue = () => {
        navigate('/final')
    }

    return (
        <div
            className="screen"
            style={{
                background: 'linear-gradient(135deg, #e5d4ff 0%, #c9e5ff 100%)',
                padding: 'var(--space-xl)'
            }}
        >
            <div className="screen-content text-center">
                {/* Breathing circle animation */}
                <motion.div
                    {...animations.breathe}
                    style={{
                        width: '150px',
                        height: '150px',
                        margin: '0 auto var(--space-2xl)',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(229,212,255,0.7) 100%)',
                        borderRadius: '50%',
                        boxShadow: '0 0 60px rgba(229,212,255,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem'
                    }}
                >
                    ✨
                </motion.div>

                {/* Text */}
                <motion.p
                    {...animations.fadeIn}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontSize: 'var(--text-xl)',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        maxWidth: '320px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}
                >
                    Иногда стоит просто остановиться
                </motion.p>

                {/* Continue button (appears after delay) */}
                {showButton && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginTop: 'var(--space-2xl)' }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={handleContinue}
                        >
                            Продолжить 💫
                        </button>
                    </motion.div>
                )}

                {/* Subtle background elements */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        right: '15%',
                        fontSize: '2rem',
                        pointerEvents: 'none'
                    }}
                >
                    🌙
                </motion.div>

                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '25%',
                        left: '10%',
                        fontSize: '1.5rem',
                        pointerEvents: 'none'
                    }}
                >
                    ⭐
                </motion.div>
            </div>
        </div>
    )
}

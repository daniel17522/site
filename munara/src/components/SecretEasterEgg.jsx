import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'

// Secret easter egg component - click 3 times to reveal
export default function SecretEasterEgg({ position = 'top-right' }) {
    const [clickCount, setClickCount] = useState(0)
    const [showSecret, setShowSecret] = useState(false)

    const positionStyles = {
        'top-right': { top: 'var(--space-lg)', right: 'var(--space-lg)' },
        'top-left': { top: 'var(--space-lg)', left: 'var(--space-lg)' },
        'bottom-right': { bottom: 'var(--space-lg)', right: 'var(--space-lg)' },
        'bottom-left': { bottom: 'var(--space-lg)', left: 'var(--space-lg)' }
    }

    useEffect(() => {
        if (clickCount >= 3) {
            setShowSecret(true)
            // Save to localStorage that secret was found
            localStorage.setItem('munara_secret_found', 'true')
        }
    }, [clickCount])

    const handleIconClick = () => {
        if (clickCount < 3) {
            setClickCount(prev => prev + 1)
        }
    }

    const handleCloseSecret = () => {
        setShowSecret(false)
    }

    return (
        <>
            {/* Subtle icon that triggers the secret */}
            {!showSecret && (
                <motion.div
                    onClick={handleIconClick}
                    animate={{
                        opacity: clickCount > 0 ? [0.3, 0.6, 0.3] : 0.3,
                        scale: clickCount > 0 ? [1, 1.1, 1] : 1
                    }}
                    transition={{
                        duration: 1,
                        repeat: clickCount > 0 ? Infinity : 0
                    }}
                    style={{
                        position: 'fixed',
                        ...positionStyles[position],
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        zIndex: 100,
                        userSelect: 'none'
                    }}
                >
                    {clickCount === 0 && '🌊'}
                    {clickCount === 1 && '⭐'}
                    {clickCount >= 2 && '📘'}
                </motion.div>
            )}

            {/* Secret message overlay */}
            {showSecret && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255, 201, 229, 0.95) 0%, rgba(229, 212, 255, 0.95) 100%)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'var(--space-lg)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onClick={handleCloseSecret}
                >
                    <motion.div
                        {...animations.scaleIn}
                        style={{
                            maxWidth: '400px',
                            textAlign: 'center',
                            padding: 'var(--space-xl)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}
                        >
                            💫
                        </motion.div>

                        <motion.p
                            {...animations.fadeIn}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'var(--text-xl)',
                                color: 'var(--color-text)',
                                lineHeight: 1.8,
                                fontFamily: 'var(--font-display)',
                                marginBottom: 'var(--space-lg)'
                            }}
                        >
                            Мне нравится, как ты видишь мир.<br />
                            И фильмы.<br />
                            И истории.<br />
                            И, наверное… немного больше.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            style={{
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-text-light)',
                                fontStyle: 'italic'
                            }}
                        >
                            (нажми в любом месте, чтобы продолжить)
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}

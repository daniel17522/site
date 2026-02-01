import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'
import { storage } from '../utils/storage'

export default function FinalScreen() {
    const navigate = useNavigate()
    const [showConfetti, setShowConfetti] = useState(true)
    const userChoice = storage.getUserChoice()

    const handleReplay = () => {
        storage.resetProgress()
        navigate('/')
    }

    const handleSave = () => {
        // Take screenshot or share
        alert('Эта функция сохранит экран как воспоминание 📸\n(В полной версии здесь будет скриншот)')
    }

    const handleInstall = () => {
        // PWA install prompt
        alert('Нажмите на кнопку "Добавить на главный экран" в меню браузера 📲')
    }

    return (
        <div
            className="screen"
            style={{
                background: 'linear-gradient(135deg, #ffc9e5 0%, #e5d4ff 50%, #ffd4a3 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Confetti animation */}
            {showConfetti && (
                <>
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                top: '-10%',
                                left: `${Math.random() * 100}%`,
                                opacity: 1
                            }}
                            animate={{
                                top: '110%',
                                rotate: Math.random() * 720 - 360,
                                opacity: [1, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 2,
                                ease: 'linear'
                            }}
                            style={{
                                position: 'absolute',
                                fontSize: ['💖', '✨', '🌸', '💫', '⭐', '🎉'][i % 6],
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        >
                            {['💖', '✨', '🌸', '💫', '⭐', '🎉'][i % 6]}
                        </motion.div>
                    ))}
                </>
            )}

            <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                {/* Main heart animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0, 1.3, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 1,
                        times: [0, 0.6, 0.8, 1],
                        ease: 'easeOut'
                    }}
                    style={{
                        fontSize: '6rem',
                        marginBottom: 'var(--space-lg)'
                    }}
                >
                    💖
                </motion.div>

                {/* Title */}
                <motion.h1
                    {...animations.slideUp}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontSize: 'var(--text-3xl)',
                        color: 'white',
                        marginBottom: 'var(--space-lg)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    Для Мунары
                </motion.h1>

                {/* Main message - PLACEHOLDER FOR PERSONALIZATION */}
                <motion.div
                    {...animations.fadeIn}
                    transition={{ delay: 0.8 }}
                    className="glass"
                    style={{
                        padding: 'var(--space-xl)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-xl)',
                        maxWidth: '360px',
                        margin: '0 auto var(--space-xl)'
                    }}
                >
                    <p style={{
                        fontSize: 'var(--text-lg)',
                        color: 'var(--color-text)',
                        lineHeight: 1.8,
                        marginBottom: 'var(--space-md)'
                    }}>
                        Это маленькое приложение — всего лишь способ сказать, как много ты значишь.
                    </p>

                    <p style={{
                        fontSize: 'var(--text-lg)',
                        color: 'var(--color-text)',
                        lineHeight: 1.8,
                        marginBottom: 'var(--space-md)'
                    }}>
                        Каждый экран, каждая игра созданы с мыслью о тебе.
                    </p>

                    <p style={{
                        fontSize: 'var(--text-lg)',
                        color: 'var(--color-text)',
                        lineHeight: 1.8,
                        marginBottom: 'var(--space-md)'
                    }}>
                        Ты выбрала «{userChoice}» — и это прекрасно, потому что любой твой выбор делает мир чуточку лучше.
                    </p>

                    <p style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-light)',
                        fontStyle: 'italic',
                        marginTop: 'var(--space-lg)'
                    }}>
                        С любовью,<br />
                        от человека, которому ты важна 💕
                    </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    {...animations.staggerContainer}
                    initial="initial"
                    animate="animate"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-md)',
                        maxWidth: '280px',
                        margin: '0 auto'
                    }}
                >
                    <motion.button
                        variants={animations.staggerItem}
                        className="btn btn-primary"
                        onClick={handleSave}
                        style={{ width: '100%' }}
                    >
                        📸 Сохранить воспоминание
                    </motion.button>

                    <motion.button
                        variants={animations.staggerItem}
                        className="btn btn-secondary"
                        onClick={handleReplay}
                        style={{ width: '100%' }}
                    >
                        🔁 Пройти ещё раз
                    </motion.button>

                    <motion.button
                        variants={animations.staggerItem}
                        className="btn btn-secondary"
                        onClick={handleInstall}
                        style={{ width: '100%' }}
                    >
                        📲 Добавить на главный экран
                    </motion.button>
                </motion.div>

                {/* Sparkle decoration */}
                <motion.div
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        marginTop: 'var(--space-xl)',
                        fontSize: 'var(--text-2xl)'
                    }}
                >
                    ✨
                </motion.div>
            </div>
        </div>
    )
}

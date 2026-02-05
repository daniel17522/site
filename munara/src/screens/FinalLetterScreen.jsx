import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { storage } from '../utils/storage'

export default function FinalLetterScreen() {
    const navigate = useNavigate()
    const [showPause, setShowPause] = useState(true)
    const [showLetter, setShowLetter] = useState(false)
    const [envelopeOpen, setEnvelopeOpen] = useState(false)
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

    useEffect(() => {
        if (showLetter) {
            const timer = setTimeout(() => {
                setEnvelopeOpen(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [showLetter])

    const handleBackToHub = () => {
        window.location.href = '/hub'
    }

    // Pre-letter pause - Magical cinematic transition
    if (showPause) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="screen"
                style={{
                    background: 'radial-gradient(circle at center, #1a0a15 0%, #0a0a0a 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Magical particles */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.5, 1, 0],
                            y: [window.innerHeight + 100, -100],
                            x: Math.random() * window.innerWidth + Math.sin(i) * 50
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            delay: Math.random() * 4,
                            repeat: Infinity,
                            ease: 'easeOut'
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: 'clamp(1rem, 3vw, 2rem)',
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.8))'
                        }}
                    >
                        {['💕', '✨', '⭐', '💖', '🌸', '💫'][i % 6]}
                    </motion.div>
                ))}

                {/* Radial glow effect */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80vw',
                        height: '80vw',
                        maxWidth: '800px',
                        maxHeight: '800px',
                        background: 'radial-gradient(circle, rgba(255, 107, 157, 0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none'
                    }}
                />

                {/* Center content */}
                <div className="screen-content text-center" style={{ position: 'relative', zIndex: 10 }}>
                    {/* Decorative top element */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            marginBottom: '2rem',
                            filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.8))'
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            👑
                        </motion.div>
                    </motion.div>

                    {/* Main text with gradient */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1, duration: 1.5, type: 'spring', bounce: 0.3 }}
                        style={{
                            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                            fontFamily: "'Pacifico', cursive",
                            fontWeight: 300,
                            background: 'linear-gradient(135deg, #ffb6d9 0%, #ff9ec5 50%, #ff6b9d 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line',
                            padding: '0 1rem',
                            position: 'relative'
                        }}
                    >
                        Ты дошла до конца.{'\n'}Надеюсь тебе понравился весь путь.
                    </motion.h2>

                    {/* Decorative bottom element */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        style={{
                            marginTop: '3rem',
                            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                            color: '#ffa6c1'
                        }}
                    >
                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            ✨ Сейчас откроется письмо ✨
                        </motion.div>
                    </motion.div>

                    {/* Floating hearts around */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`heart-${i}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                y: [0, -100],
                                x: Math.cos((i / 6) * Math.PI * 2) * 150
                            }}
                            transition={{
                                duration: 3,
                                delay: 2 + i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                fontSize: '2rem',
                                pointerEvents: 'none'
                            }}
                        >
                            💕
                        </motion.div>
                    ))}
                </div>

                {/* Corner decorations */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
                    <motion.div
                        key={corner}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 0.6,
                            rotate: [0, 10, 0]
                        }}
                        transition={{
                            scale: { delay: 0.5 + i * 0.2, duration: 0.8 },
                            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                        }}
                        style={{
                            position: 'absolute',
                            [corner.split('-')[0]]: '2rem',
                            [corner.split('-')[1]]: '2rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.6))'
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </motion.div>
        )
    }

    // Actual letter
    if (showLetter) {
        return (
            <div
                className="screen"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a15 50%, #0f0a1a 100%)',
                    padding: '2rem',
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {/* Animated gradient background */}
                <motion.div
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)'
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 0
                    }}
                />

                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.sin(i) * 30, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'easeInOut'
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: 'clamp(0.8rem, 2vw, 1.5rem)',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    >
                        {['💕', '✨', '💖', '🌸', '💫', '⭐'][i % 6]}
                    </motion.div>
                ))}

                <div className="screen-content" style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    {/* Envelope animation */}
                    <AnimatePresence>
                        {!envelopeOpen && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 1.2, opacity: 0 }}
                                transition={{ duration: 0.8, type: 'spring' }}
                                style={{
                                    textAlign: 'center',
                                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                                    marginBottom: '2rem',
                                    filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.8))',
                                    position: 'relative'
                                }}
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, -5, 5, -5, 0],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    💌
                                </motion.div>

                                {/* Sparkles around envelope */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [0, 1.5, 0],
                                            opacity: [0, 1, 0],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.25
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 30}%`,
                                            top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 30}%`,
                                            fontSize: '2rem',
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        ✨
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Letter content - appears after envelope opens */}
                    <AnimatePresence>
                        {envelopeOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
                            >
                                {/* Decorative header */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    style={{
                                        height: '3px',
                                        background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)',
                                        marginBottom: '2rem'
                                    }}
                                />

                                {/* Paper background effect */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 1 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 182, 193, 0.05) 100%)',
                                        borderRadius: '20px',
                                        padding: 'clamp(1.5rem, 5vw, 3rem)',
                                        boxShadow: '0 20px 60px rgba(255, 107, 157, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 107, 157, 0.2)',
                                        backdropFilter: 'blur(10px)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Decorative corner elements */}
                                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                                        <motion.div
                                            key={corner}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                [corner.split('-')[0]]: '10px',
                                                [corner.split('-')[1]]: '10px',
                                                width: '30px',
                                                height: '30px',
                                                borderTop: corner.includes('top') ? '2px solid rgba(255, 107, 157, 0.3)' : 'none',
                                                borderBottom: corner.includes('bottom') ? '2px solid rgba(255, 107, 157, 0.3)' : 'none',
                                                borderLeft: corner.includes('left') ? '2px solid rgba(255, 107, 157, 0.3)' : 'none',
                                                borderRight: corner.includes('right') ? '2px solid rgba(255, 107, 157, 0.3)' : 'none'
                                            }}
                                        />
                                    ))}

                                    {/* Letter text with staggered animation */}
                                    <div
                                        style={{
                                            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                            fontFamily: "'Pacifico', cursive",
                                            color: '#ffb6c1',
                                            lineHeight: 2,
                                            position: 'relative'
                                        }}
                                    >
                                        <motion.p
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem', color: '#ff9ec5', fontSize: '1.3rem' }}
                                        >
                                            Munara,
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem' }}
                                        >
                                            Я надеюсь, что весь этот путь тебе понравился. Прости, если что-то было слишком банально или странно - я не профессионал в таких вещах.
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.4, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem' }}
                                        >
                                            Я работал над этим около двух недель, днями и ночами. Хотел сделать что-то особенное, что-то, что могло бы удивить тебя и показать, как много ты для меня значишь.
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.6, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem' }}
                                        >
                                            Каждая мини-игра, каждая фотография, каждая песня - всё это было выбрано с мыслью о тебе. Я хотел создать маленький мир, где ты могла бы почувствовать себя особенной. Потому что ты особенная.
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.8, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem' }}
                                        >
                                            Я знаю, что мы друзья, и я не жду от тебя какого-то конкретного ответа. Это был мой способ показать, как сильно я ценю тебя в моей жизни. Независимо от того, что будет дальше, я просто хотел, чтобы ты знала.
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 2, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem' }}
                                        >
                                            Спасибо, что прошла весь этот путь до конца. Это само по себе значит очень много для меня.
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 2.2, duration: 0.8 }}
                                            style={{ marginBottom: '1.5rem', color: '#ff9ec5', marginTop: '2rem', fontSize: '1.2rem' }}
                                        >
                                            С теплом,<br />
                                            Даня :) 💕
                                        </motion.p>
                                    </div>
                                </motion.div>

                                {/* Decorative footer */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 2.5, duration: 1 }}
                                    style={{
                                        height: '3px',
                                        background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)',
                                        marginTop: '2rem',
                                        marginBottom: '2rem'
                                    }}
                                />

                                {/* Back button */}
                                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.8, duration: 0.8 }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 15px 50px rgba(255, 107, 157, 0.6), 0 0 30px rgba(255, 107, 157, 0.4)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleBackToHub}
                                        style={{
                                            background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9ec5 100%)',
                                            border: '2px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '50px',
                                            padding: '15px 50px',
                                            color: 'white',
                                            fontSize: '1.1rem',
                                            fontFamily: "'Pacifico', cursive",
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 30px rgba(255, 107, 157, 0.4)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <span style={{ position: 'relative', zIndex: 1 }}>Вернуться 🏠</span>

                                        {/* Button shine effect */}
                                        <motion.div
                                            animate={{
                                                x: ['-100%', '200%']
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatDelay: 1
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '50%',
                                                height: '100%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                                transform: 'skewX(-20deg)'
                                            }}
                                        />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        )
    }

    return null
}

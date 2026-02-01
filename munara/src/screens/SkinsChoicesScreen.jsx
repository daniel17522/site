import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

const FLASHING_WORDS = ['love', 'fear', 'mess', 'now', 'escape', 'stay']

export default function SkinsChoicesScreen() {
    const navigate = useNavigate()
    const [currentWord, setCurrentWord] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setCurrentWord(prev => (prev + 1) % FLASHING_WORDS.length)
        }, 800)

        const timerInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1 && !clicked) {
                    setCompleted(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(wordInterval)
            clearInterval(timerInterval)
        }
    }, [clicked])

    const handleClick = () => {
        if (!clicked && !completed) {
            setClicked(true)
            setTimeout(() => {
                setCompleted(true)
            }, 2000)
        }
    }

    const handleFinish = () => {
        completeCard(CARDS.SKINS)
        window.location.href = '/hub'
    }

    if (completed) {
        return (
            <div
                className="screen"
                style={{
                    background: '#0a0a0a',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Neon glow */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none'
                    }}
                />

                <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <h2
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: '#ff6bf6',
                                lineHeight: 1.8,
                                whiteSpace: 'pre-line',
                                marginBottom: '3rem',
                                textShadow: '0 0 30px rgba(255, 0, 255, 0.4)'
                            }}
                        >
                            {clicked
                                ? 'Ты чувствуешь.\nЭто уже смело.'
                                : 'Ты умеешь быть в хаосе\nи не убегать.'
                            }
                        </h2>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 50px rgba(255, 0, 255, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFinish}
                            style={{
                                background: 'linear-gradient(135deg, #ff00ff 0%, #ff6bf6 100%)',
                                border: 'none',
                                borderRadius: '50px',
                                padding: '15px 40px',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-primary)',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(255, 0, 255, 0.4)'
                            }}
                        >
                            Дальше
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="screen"
            onClick={handleClick}
            style={{
                background: '#0a0a0a',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default'
            }}
        >
            {/* Chaotic flashes */}
            <motion.div
                animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                }}
                style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: '200px',
                    height: '200px',
                    background: currentWord % 2 === 0
                        ? 'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none'
                }}
            />

            <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    key={currentWord}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 'clamp(2rem, 8vw, 4rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'lowercase',
                        textShadow: '0 0 30px rgba(255, 0, 255, 0.8)',
                        marginBottom: '2rem'
                    }}
                >
                    {FLASHING_WORDS[currentWord]}
                </motion.div>

                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                        fontSize: '0.8rem',
                        color: 'rgba(255, 255, 255, 0.3)',
                        position: 'absolute',
                        bottom: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    {timeLeft > 0 ? `${timeLeft}` : ''}
                </motion.div>
            </div>
        </div>
    )
}

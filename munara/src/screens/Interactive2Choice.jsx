import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

const WORDS = [
    { id: 1, text: 'остаться', x: 20, y: 30 },
    { id: 2, text: 'уйти', x: 70, y: 25 },
    { id: 3, text: 'чувствовать', x: 35, y: 55 },
    { id: 4, text: 'молчать', x: 65, y: 60 },
    { id: 5, text: 'рискнуть', x: 25, y: 75 },
    { id: 6, text: 'отпустить', x: 80, y: 70 }
]

export default function Interactive2Choice() {
    const navigate = useNavigate()
    const [selectedWord, setSelectedWord] = useState(null)
    const [showEnding, setShowEnding] = useState(false)

    const handleWordClick = (word) => {
        if (selectedWord) return

        setSelectedWord(word)
        setTimeout(() => {
            setShowEnding(true)
        }, 2000)
    }

    const handleContinue = () => {
        completeCard(CARDS.CHOICE)
        window.location.href = '/hub'
    }

    if (showEnding) {
        return (
            <div
                className="screen"
                style={{
                    background: '#0a0a0a',
                    position: 'relative'
                }}
            >
                {/* Pink glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255, 158, 197, 0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }} />

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
                                color: '#ff9ec5',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                                marginBottom: '3rem'
                            }}
                        >
                            Остальные варианты{'\n'}всё равно были с тобой.
                        </h2>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 158, 197, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContinue}
                            style={{
                                background: 'linear-gradient(135deg, #ff9ec5 0%, #ffc9d6 100%)',
                                border: 'none',
                                borderRadius: '50px',
                                padding: '15px 40px',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-primary)',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(255, 158, 197, 0.3)'
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
            style={{
                background: '#0a0a0a',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Breathing glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(255, 158, 197, 0.2) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}
            />

            {/* Prompt */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={selectedWord ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                style={{
                    position: 'absolute',
                    top: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    width: '100%',
                    zIndex: 10
                }}
            >
                <h2
                    style={{
                        fontSize: '1.3rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        color: '#ff9ec5',
                        letterSpacing: '0.1em'
                    }}
                >
                    Выбери, не думая.
                </h2>
            </motion.div>

            {/* Floating words */}
            <AnimatePresence>
                {WORDS.map((word, index) => {
                    const isSelected = selectedWord?.id === word.id
                    const shouldVanish = selectedWord && selectedWord.id !== word.id

                    return (
                        <motion.div
                            key={word.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                shouldVanish
                                    ? { opacity: 0, scale: 0.9, filter: 'blur(10px)', transition: { duration: 1 } }
                                    : {
                                        opacity: isSelected ? 0 : 1,
                                        y: [0, Math.sin(index * 1.5) * 8, 0],
                                        x: [0, Math.cos(index * 2) * 5, 0]
                                    }
                            }
                            transition={{
                                opacity: { delay: index * 0.15, duration: 1 },
                                y: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut' },
                                x: { duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            whileHover={{
                                scale: 1.1,
                                textShadow: '0 0 20px rgba(255, 158, 197, 0.8)',
                                color: '#ffb6c1',
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => handleWordClick(word)}
                            style={{
                                position: 'absolute',
                                left: `${word.x}%`,
                                top: `${word.y}%`,
                                transform: 'translate(-50%, -50%)',
                                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: 'rgba(255, 158, 197, 0.7)',
                                cursor: selectedWord ? 'default' : 'pointer',
                                userSelect: 'none',
                                padding: '1rem',
                                pointerEvents: selectedWord ? 'none' : 'auto',
                                transition: 'color 0.3s ease'
                            }}
                        >
                            {word.text}
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            {/* Selected word isolated moment */}
            {selectedWord && (
                <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0, 1, 0], scale: 1.1, letterSpacing: '0.2em' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        color: '#ffb6c1',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        textShadow: '0 0 40px rgba(255, 107, 157, 0.6)'
                    }}
                >
                    {selectedWord.text}
                </motion.div>
            )}
        </div>
    )
}

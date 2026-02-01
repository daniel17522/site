import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'
import { answerValentineQuestion } from '../utils/progress'
import ConfettiEffect from '../components/ConfettiEffect'

export default function ValentineQuestionScreen() {
    const navigate = useNavigate()
    const [noClickCount, setNoClickCount] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)

    const getQuestionText = () => {
        if (noClickCount === 0) return "Will you be my\nValentine?"
        if (noClickCount === 1) return 'Точно нет?'
        if (noClickCount === 2) return 'Ты уверена?\nЯ старался…'
        return 'Ладно.\nНо мне всё равно хочется,\nчтобы ты это увидела 🌸'
    }

    const handleYes = () => {
        answerValentineQuestion()
        setShowConfetti(true)

        setTimeout(() => {
            window.location.href = '/hub'
        }, 2500)
    }

    const handleNo = () => {
        if (noClickCount < 3) {
            setNoClickCount(prev => prev + 1)
        }
    }

    const handleContinue = () => {
        answerValentineQuestion()
        window.location.href = '/hub'
    }

    return (
        <div
            className="screen"
            style={{
                background: 'linear-gradient(135deg, #ff6b8a 0%, #ff91a4 50%, #ffa6b8 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <ConfettiEffect show={showConfetti} />

            {/* Decorative sticker elements */}
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '12%',
                    left: '8%',
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    filter: 'drop-shadow(3px 3px 0px rgba(255, 255, 255, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 255, 255, 0.6))',
                    zIndex: 1
                }}
            >
                💘
            </motion.div>

            <motion.div
                animate={{ rotate: [0, -15, 15, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '15%',
                    right: '10%',
                    fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                    filter: 'drop-shadow(3px 3px 0px rgba(255, 255, 255, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 255, 255, 0.6))',
                    zIndex: 1
                }}
            >
                🥂
            </motion.div>

            <motion.div
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '12%',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    filter: 'drop-shadow(3px 3px 0px rgba(255, 255, 255, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 255, 255, 0.6))',
                    zIndex: 1
                }}
            >
                🍫
            </motion.div>

            <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '18%',
                    right: '15%',
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                    filter: 'drop-shadow(3px 3px 0px rgba(255, 255, 255, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 255, 255, 0.6))',
                    zIndex: 1
                }}
            >
                💝
            </motion.div>

            {/* Small floating hearts */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 0.7, 0.4],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                    style={{
                        position: 'absolute',
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        fontSize: '1.5rem',
                        pointerEvents: 'none',
                        opacity: 0.5
                    }}
                >
                    {['💕', '💖', '✨', '💗'][i % 4]}
                </motion.div>
            ))}

            <div className="screen-content text-center" style={{ position: 'relative', zIndex: 10 }}>
                {/* Question Text */}
                <motion.div
                    key={noClickCount}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                            fontFamily: "'Pacifico', 'Dancing Script', cursive",
                            fontWeight: 400,
                            color: 'white',
                            lineHeight: 1.3,
                            whiteSpace: 'pre-line',
                            textShadow: `
                3px 3px 0px #ff4d7a,
                -2px -2px 0px #ff8fa8,
                0 4px 20px rgba(255, 77, 122, 0.4)
              `,
                            letterSpacing: '0.02em'
                        }}
                    >
                        {getQuestionText()}
                    </h1>
                </motion.div>

                {/* Sigh animation on second No click */}
                {noClickCount === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [-10, -30, -50]
                        }}
                        transition={{ duration: 2 }}
                        style={{
                            fontSize: '3rem',
                            marginBottom: '2rem',
                            filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.6))'
                        }}
                    >
                        😔
                    </motion.div>
                )}

                {/* Buttons */}
                <motion.div
                    variants={animations.staggerContainer}
                    initial="initial"
                    animate="animate"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        maxWidth: '350px',
                        margin: '0 auto'
                    }}
                >
                    {/* Yes Button */}
                    <motion.button
                        variants={animations.staggerItem}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 10px 40px rgba(255, 255, 255, 0.6), 4px 4px 0px #ff4d7a'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYes}
                        style={{
                            background: 'white',
                            border: '3px solid #ff4d7a',
                            borderRadius: '50px',
                            padding: '20px 50px',
                            fontSize: '1.5rem',
                            fontFamily: "'Pacifico', cursive",
                            fontWeight: 400,
                            color: '#ff4d7a',
                            cursor: 'pointer',
                            boxShadow: '3px 3px 0px #ff4d7a',
                            letterSpacing: '0.05em',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        💖 Yes!
                    </motion.button>

                    {/* No / Continue Button */}
                    {noClickCount < 3 ? (
                        <motion.button
                            variants={animations.staggerItem}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNo}
                            style={{
                                background: 'transparent',
                                border: '3px solid white',
                                borderRadius: '50px',
                                padding: '20px 50px',
                                fontSize: '1.5rem',
                                fontFamily: "'Pacifico', cursive",
                                fontWeight: 400,
                                color: 'white',
                                cursor: 'pointer',
                                boxShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)',
                                letterSpacing: '0.05em',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            🤍 No
                        </motion.button>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 10px 40px rgba(255, 255, 255, 0.6), 4px 4px 0px white'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContinue}
                            style={{
                                background: 'white',
                                border: '3px solid #ff91a4',
                                borderRadius: '50px',
                                padding: '20px 50px',
                                fontSize: '1.5rem',
                                fontFamily: "'Pacifico', cursive",
                                fontWeight: 400,
                                color: '#ff91a4',
                                cursor: 'pointer',
                                boxShadow: '3px 3px 0px #ff91a4',
                                letterSpacing: '0.05em',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            💫 Continue
                        </motion.button>
                    )}
                </motion.div>

                {/* Small decorative text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 1 }}
                    style={{
                        marginTop: '2.5rem',
                        fontSize: '1rem',
                        color: 'white',
                        fontFamily: "'Pacifico', cursive",
                        letterSpacing: '0.1em',
                        textShadow: '2px 2px 4px rgba(255, 77, 122, 0.3)'
                    }}
                >
                    Happy Valentine's Day bro! 💖
                </motion.p>
            </div>
        </div>
    )
}

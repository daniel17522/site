import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'
import { getRandomPrediction } from '../utils/predictions'

export default function MagicEightBall() {
    const navigate = useNavigate()
    const [isShaking, setIsShaking] = useState(false)
    const [prediction, setPrediction] = useState(null)
    const [previousPrediction, setPreviousPrediction] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [currentAnswer, setCurrentAnswer] = useState('')

    // Mark as completed when user enters
    useEffect(() => {
        completeCard(CARDS.MAGIC_BALL)
    }, [])

    // Shake detection for mobile
    useEffect(() => {
        let shakeThreshold = 15
        let lastUpdate = 0
        let lastX = 0, lastY = 0, lastZ = 0

        const handleMotion = (event) => {
            const acceleration = event.accelerationIncludingGravity
            const currentTime = new Date().getTime()

            if ((currentTime - lastUpdate) > 100) {
                const diffTime = currentTime - lastUpdate
                lastUpdate = currentTime

                const x = acceleration.x
                const y = acceleration.y
                const z = acceleration.z

                const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000

                if (speed > shakeThreshold) {
                    handleShake()
                }

                lastX = x
                lastY = y
                lastZ = z
            }
        }

        window.addEventListener('devicemotion', handleMotion)
        return () => window.removeEventListener('devicemotion', handleMotion)
    }, [previousPrediction])

    const handleShake = () => {
        if (isShaking) return

        setIsShaking(true)
        setPrediction(null)

        setTimeout(() => {
            const newPrediction = getRandomPrediction(previousPrediction)
            setPrediction(newPrediction)
            setPreviousPrediction(newPrediction)
            setIsShaking(false)
        }, 1500)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'radial-gradient(ellipse at center, #2d1b4e 0%, #0a0a1a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Mystical particles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: '4px',
                        height: '4px',
                        background: '#ffd700',
                        borderRadius: '50%',
                        boxShadow: '0 0 8px #ffd700',
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* Back button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/hub')}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    padding: '10px 24px',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: "'Pacifico', cursive",
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    zIndex: 100
                }}
            >
                ← Back
            </motion.button>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    color: '#ffd700',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                }}
            >
                Magic 8-Ball 🔮
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                    color: '#b19cd9',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontFamily: "'Pacifico', cursive"
                }}
            >
                Ask a question about everything you want :)
            </motion.p>

            {/* The Magic Ball */}
            <motion.div
                animate={{
                    y: isShaking ? [0, -10, 10, -10, 10, 0] : [0, -15, 0],
                    rotate: isShaking ? [0, -15, 15, -15, 15, 0] : 0,
                    scale: isShaking ? [1, 1.05, 0.95, 1.05, 0.95, 1] : 1
                }}
                transition={{
                    y: isShaking ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 0.5 },
                    scale: { duration: 0.5 }
                }}
                onClick={handleShake}
                style={{
                    width: 'clamp(250px, 40vw, 350px)',
                    height: 'clamp(250px, 40vw, 350px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #000000)',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 -20px 40px rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Shine effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '20%',
                        width: '40%',
                        height: '30%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}
                />

                {/* Inner window */}
                <motion.div
                    animate={{
                        backgroundColor: isShaking
                            ? ['#2d1b4e', '#4a148c', '#7b1fa2', '#4a148c', '#2d1b4e']
                            : '#2d1b4e'
                    }}
                    transition={{ duration: 1.5 }}
                    style={{
                        width: '45%',
                        height: '45%',
                        borderRadius: '50%',
                        background: '#2d1b4e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.8)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Liquid swirl effect */}
                    {isShaking && (
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                rotate: { duration: 1, repeat: 2 },
                                scale: { duration: 0.5, repeat: 4 }
                            }}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'conic-gradient(from 0deg, transparent, #9c27b0, transparent)',
                                opacity: 0.5
                            }}
                        />
                    )}

                    {/* Answer or 8 */}
                    <AnimatePresence mode="wait">
                        {prediction ? (
                            <motion.div
                                key="answer"
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.8, type: 'spring' }}
                                style={{
                                    color: 'white',
                                    fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                                    textAlign: 'center',
                                    padding: '1rem',
                                    fontFamily: "'Pacifico', cursive",
                                    lineHeight: 1.4,
                                    textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
                                    zIndex: 10
                                }}
                            >
                                {prediction}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="number"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    fontSize: 'clamp(4rem, 8vw, 6rem)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontFamily: 'Arial, sans-serif',
                                    textShadow: '0 4px 20px rgba(255, 255, 255, 0.5)'
                                }}
                            >
                                8
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Instructions */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1 }}
                style={{
                    marginTop: '2rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    color: '#b19cd9',
                    textAlign: 'center',
                    fontFamily: "'Pacifico', cursive"
                }}
            >
                {prediction ? 'Ask again for another answer ✨' : 'Shake or tap the ball ✨'}
            </motion.p>
        </div>
    )
}

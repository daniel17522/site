import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

export default function CinemaRealityScreen() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            x.set((clientX - centerX) / 50)
            y.set((clientY - centerY) / 50)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [x, y])

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1)
        } else {
            completeCard(CARDS.CINEMA)
            window.location.href = '/hub'
        }
    }

    // Step 0: Cinematic moment
    if (currentStep === 0) {
        return (
            <div
                className="screen"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#000',
                    cursor: 'pointer'
                }}
                onClick={handleNext}
            >
                {/* Cinematic gradient background */}
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1.15, opacity: 1 }}
                    transition={{
                        scale: { duration: 15, ease: 'linear' },
                        opacity: { duration: 2 }
                    }}
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        right: -20,
                        bottom: -20,
                        background: 'linear-gradient(135deg, #1a0a0a 0%, #2a1a1a 30%, #4a2a2a 60%, #3a1a1a 100%)',
                        filter: 'contrast(1.1) brightness(0.7)',
                        x,
                        y
                    }}
                />

                {/* Atmospheric overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 60% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />

                <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        style={{ x: useTransform(x, value => value * -0.5), y: useTransform(y, value => value * -0.5) }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.9, y: 0 }}
                            transition={{ delay: 2, duration: 2 }}
                            style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: 'rgba(255, 255, 255, 0.95)',
                                lineHeight: 1.6,
                                letterSpacing: '0.05em',
                                textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                                whiteSpace: 'pre-line'
                            }}
                        >
                            Кино знает,{'\n'}как быть красивым.
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ delay: 6, duration: 4, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: '0.2em'
                        }}
                    >
                        TAP TO CONTINUE
                    </motion.div>
                </div>
            </div>
        )
    }

    // Step 1: Black silence
    if (currentStep === 1) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                className="screen"
                style={{
                    background: '#050505',
                    cursor: 'pointer'
                }}
                onClick={handleNext}
            />
        )
    }

    // Step 2: Reality
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
                background: 'radial-gradient(circle, rgba(255, 182, 193, 0.2) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />

            <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            color: '#ffb6c1',
                            lineHeight: 1.6,
                            letterSpacing: '-0.01em',
                            marginBottom: '3rem',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        А реальность —{'\n'}как быть настоящей.
                    </h2>

                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3, duration: 1 }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 182, 193, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        style={{
                            background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc9d6 100%)',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '15px 40px',
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.1rem',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(255, 182, 193, 0.3)'
                        }}
                    >
                        Вернуться
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

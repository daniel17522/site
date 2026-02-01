import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { animations } from '../utils/animations'
import Button from '../components/Button'

export default function WelcomeScreen() {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/game1')
    }

    return (
        <div className="screen" style={{ background: 'var(--color-background)' }}>
            <div className="screen-content text-center">
                {/* Animated name with sparkles */}
                <motion.div
                    {...animations.fadeIn}
                    style={{ marginBottom: 'var(--space-xl)' }}
                >
                    <motion.h1
                        className="text-gradient"
                        animate={{
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        style={{
                            fontSize: 'var(--text-4xl)',
                            fontWeight: 700,
                            position: 'relative',
                            display: 'inline-block'
                        }}
                    >
                        Мунара
                        <motion.span
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5
                            }}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-20px',
                                fontSize: '1.5rem'
                            }}
                        >
                            ✨
                        </motion.span>
                    </motion.h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    {...animations.slideUp}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: 'var(--text-xl)',
                        color: 'var(--color-text-light)',
                        marginBottom: 'var(--space-2xl)',
                        fontFamily: 'var(--font-display)'
                    }}
                >
                    Готова к небольшому приключению?
                </motion.p>

                {/* Decorative heart */}
                <motion.div
                    {...animations.float}
                    style={{
                        fontSize: '4rem',
                        marginBottom: 'var(--space-xl)'
                    }}
                >
                    💖
                </motion.div>

                {/* Start button */}
                <Button onClick={handleStart}>
                    Начать 👉
                </Button>
            </div>

            {/* Background decorations */}
            <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear'
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    fontSize: '2rem',
                    opacity: 0.3
                }}
            >
                🌸
            </motion.div>

            <motion.div
                animate={{
                    rotate: -360
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear'
                }}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '15%',
                    fontSize: '2rem',
                    opacity: 0.3
                }}
            >
                ⭐
            </motion.div>
        </div>
    )
}

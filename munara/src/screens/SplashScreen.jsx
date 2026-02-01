import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'

export default function SplashScreen() {
    const navigate = useNavigate()

    useEffect(() => {
        // Auto-navigate to welcome screen after 3 seconds
        const timer = setTimeout(() => {
            navigate('/welcome')
        }, 3000)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className="screen" style={{ background: 'linear-gradient(135deg, #ffc9e5 0%, #e5d4ff 100%)' }}>
            <div className="screen-content text-center">
                <motion.div
                    {...animations.scaleIn}
                    style={{ marginBottom: '2rem' }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        style={{ fontSize: '6rem' }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                <motion.h2
                    {...animations.fadeIn}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        padding: '0 var(--space-lg)'
                    }}
                >
                    Это маленькое приложение<br />
                    создано специально для тебя
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        marginTop: 'var(--space-xl)',
                        fontSize: 'var(--text-sm)',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }}
                >
                    ✨
                </motion.div>
            </div>

            {/* Floating decorative elements */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [0, -100],
                        x: Math.random() * 50 - 25
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        position: 'absolute',
                        left: `${10 + i * 15}%`,
                        bottom: '-10%',
                        fontSize: '1.5rem'
                    }}
                >
                    {['✨', '💫', '⭐', '🌸'][i % 4]}
                </motion.div>
            ))}
        </div>
    )
}

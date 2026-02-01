import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ConfettiEffect({ show, onComplete }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (show) {
            // Generate confetti particles
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                emoji: ['💖', '✨', '💕', '🌸', '💫'][i % 5],
                startX: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 1,
                rotation: Math.random() * 720 - 360
            }))
            setParticles(newParticles)

            // Call onComplete after animation
            const timer = setTimeout(() => {
                if (onComplete) onComplete()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [show, onComplete])

    if (!show) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden'
            }}
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        top: '-10%',
                        left: `${particle.startX}%`,
                        opacity: 1
                    }}
                    animate={{
                        top: '110%',
                        rotate: particle.rotation,
                        opacity: [1, 1, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        fontSize: '2rem',
                        userSelect: 'none'
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    )
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

export default function ConstellationGameScreen() {
    const navigate = useNavigate()

    useEffect(() => {
        // Mark as completed when screen loads
        completeCard(CARDS.CONSTELLATION)
    }, [])

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}
        >
            {/* Milky Way gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(100, 50, 150, 0.15) 50%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Nebula clouds */}
            {[
                { x: 20, y: 15, size: 400, color: 'rgba(138, 43, 226, 0.08)', delay: 0 },
                { x: 70, y: 60, size: 350, color: 'rgba(75, 0, 130, 0.07)', delay: 2 },
                { x: 45, y: 35, size: 450, color: 'rgba(106, 90, 205, 0.06)', delay: 4 }
            ].map((nebula, i) => (
                <motion.div
                    key={`nebula-${i}`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 20 + i * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: nebula.delay
                    }}
                    style={{
                        position: 'absolute',
                        left: `${nebula.x}%`,
                        top: `${nebula.y}%`,
                        width: `${nebula.size}px`,
                        height: `${nebula.size}px`,
                        background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />
            ))}

            {/* Different types of stars */}
            {/* Bright twinkling stars */}
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={`bright-star-${i}`}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.9, 1.4, 0.9]
                    }}
                    transition={{
                        duration: 1.5 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${3 + Math.random() * 3}px`,
                        height: `${3 + Math.random() * 3}px`,
                        background: 'white',
                        borderRadius: '50%',
                        boxShadow: `0 0 ${4 + Math.random() * 6}px rgba(255, 255, 255, 0.8)`,
                        pointerEvents: 'none',
                        zIndex: 2
                    }}
                />
            ))}

            {/* Smaller dim stars */}
            {[...Array(60)].map((_, i) => (
                <motion.div
                    key={`dim-star-${i}`}
                    animate={{
                        opacity: [0.1, 0.5, 0.1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 4
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: '2px',
                        height: '2px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 2
                    }}
                />
            ))}

            {/* Shooting stars */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`shooting-${i}`}
                    animate={{
                        x: [-100, window.innerWidth],
                        y: [-50, 400],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 8 + Math.random() * 5,
                        ease: 'easeOut'
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 50}%`,
                        top: `${Math.random() * 30}%`,
                        width: '100px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, white, transparent)',
                        transform: 'rotate(45deg)',
                        pointerEvents: 'none',
                        zIndex: 3
                    }}
                />
            ))}

            {/* Constellation lines background */}
            {[...Array(8)].map((_, i) => (
                <motion.svg
                    key={`constellation-${i}`}
                    animate={{
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: i
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`,
                        width: '150px',
                        height: '150px',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    <line
                        x1={Math.random() * 100}
                        y1={Math.random() * 100}
                        x2={Math.random() * 100 + 50}
                        y2={Math.random() * 100 + 50}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="1"
                    />
                    <circle cx={Math.random() * 100} cy={Math.random() * 100} r="3" fill="white" opacity="0.5" />
                    <circle cx={Math.random() * 100 + 50} cy={Math.random() * 100 + 50} r="3" fill="white" opacity="0.5" />
                </motion.svg>
            ))}

            {/* Enhanced decorative corner stars with glow */}
            {/* Top Left */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    fontSize: '3rem',
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    zIndex: 4
                }}
            >
                ✨
            </motion.div>

            {/* Top Right */}
            <motion.div
                animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                    position: 'absolute',
                    top: '8%',
                    right: '5%',
                    fontSize: '2.5rem',
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    zIndex: 4
                }}
            >
                ⭐
            </motion.div>

            {/* Bottom Left */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '8%',
                    fontSize: '2.8rem',
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    zIndex: 4
                }}
            >
                💫
            </motion.div>

            {/* Bottom Right */}
            <motion.div
                animate={{
                    rotate: -360,
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    rotate: { duration: 22, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                    position: 'absolute',
                    bottom: '8%',
                    right: '6%',
                    fontSize: '3rem',
                    opacity: 0.7,
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    zIndex: 4
                }}
            >
                ✨
            </motion.div>

            {/* Enhanced floating hearts with more variety */}
            {[
                { x: 10, y: 30, delay: 0, size: 1.5, color: '#ff69b4' },
                { x: 90, y: 40, delay: 1, size: 1.8, color: '#ffb6c1' },
                { x: 15, y: 70, delay: 2, size: 1.6, color: '#ffc0cb' },
                { x: 85, y: 65, delay: 1.5, size: 1.7, color: '#ff69b4' },
                { x: 50, y: 20, delay: 2.5, size: 1.4, color: '#ffb6c1' },
                { x: 30, y: 85, delay: 3, size: 1.5, color: '#ffc0cb' }
            ].map((heart, i) => (
                <motion.div
                    key={`heart-${i}`}
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.3, 0.7, 0.3],
                        y: [0, -20, 0],
                        rotate: [-5, 5, -5]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        left: `${heart.x}%`,
                        top: `${heart.y}%`,
                        fontSize: `${heart.size}rem`,
                        filter: `drop-shadow(0 0 8px ${heart.color})`,
                        pointerEvents: 'none',
                        zIndex: 4
                    }}
                >
                    💕
                </motion.div>
            ))}

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    zIndex: 10,
                    position: 'relative'
                }}
            >
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: '#ffd700',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 2px 2px 10px rgba(0,0,0,0.8)'
                    }}
                >
                    Your Special Night ✨
                </motion.h1>

                {/* Birthday Star Map */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: 'clamp(15px, 3vw, 25px)',
                        boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3), 0 0 0 3px rgba(255, 215, 0, 0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Sparkle effects around the image */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.3,
                                repeat: Infinity
                            }}
                            style={{
                                position: 'absolute',
                                left: `${Math.cos((i / 12) * Math.PI * 2) * 45 + 50}%`,
                                top: `${Math.sin((i / 12) * Math.PI * 2) * 45 + 50}%`,
                                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                                pointerEvents: 'none',
                                zIndex: 10
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}

                    <img
                        src="/birthday-sky.png"
                        alt="Birthday Star Map"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: '15px'
                        }}
                    />
                </motion.div>

                {/* Romantic message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '2rem'
                    }}
                >
                    <motion.p
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                            color: '#ffd700',
                            fontFamily: "'Pacifico', cursive",
                            marginBottom: '0.8rem',
                            textShadow: '0 0 15px rgba(255, 215, 0, 0.6), 1px 1px 5px rgba(0,0,0,0.8)'
                        }}
                    >
                        The stars aligned just for you 💫
                    </motion.p>

                    <p
                        style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                            color: '#ffb6c1',
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            margin: '0 auto',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                        }}
                    >
                        On this night, the universe created something perfect.<br />
                        Your constellation will shine forever in my sky ✨
                    </p>
                </motion.div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '2.5rem'
                    }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/hub')}
                        style={{
                            background: 'linear-gradient(135deg, #ff6b9d 0%, #ffd700 100%)',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '12px 40px',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontFamily: "'Pacifico', cursive",
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)'
                        }}
                    >
                        Return to Hub 💖
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

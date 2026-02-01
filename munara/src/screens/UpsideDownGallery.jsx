import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

const UPSIDE_DOWN_PHOTOS = [
    {
        id: 1,
        src: '/munara-1.png',
        secret: 'Я нашел тебя в этом мире 💕'
    },
    {
        id: 2,
        src: '/munara-2.png',
        secret: 'Даже в темноте ты сияешь ✨'
    },
    {
        id: 3,
        src: '/munara-3.png',
        secret: 'Моя реальность лучше с тобой 🌟'
    },
    {
        id: 4,
        src: '/munara-4.png',
        secret: 'В каждой вселенной я выбираю тебя 💫'
    },
    {
        id: 5,
        src: '/munara-5.png',
        secret: 'Ты - мой выход из темноты 🌸'
    }
]

export default function UpsideDownGallery() {
    const navigate = useNavigate()
    const [isEntering, setIsEntering] = useState(true)
    const [showSecret, setShowSecret] = useState(-1)
    const [flickerState, setFlickerState] = useState(true)

    // Load Stranger Things font
    useEffect(() => {
        const link = document.createElement('link')
        link.href = 'https://fonts.cdnfonts.com/css/benguiat'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        return () => document.head.removeChild(link)
    }, [])

    useEffect(() => {
        const entryTimer = setTimeout(() => setIsEntering(false), 2000)
        return () => clearTimeout(entryTimer)
    }, [])

    // Flickering lights effect
    useEffect(() => {
        const flickerInterval = setInterval(() => {
            setFlickerState(prev => !prev)
        }, 2000 + Math.random() * 3000)

        return () => clearInterval(flickerInterval)
    }, [])

    // Show secret on flicker
    useEffect(() => {
        if (!flickerState && !isEntering) {
            const randomPhoto = Math.floor(Math.random() * UPSIDE_DOWN_PHOTOS.length)
            setShowSecret(randomPhoto)

            setTimeout(() => setShowSecret(-1), 2000)
        }
    }, [flickerState, isEntering])

    // Mark as completed when user enters
    useEffect(() => {
        completeCard(CARDS.UPSIDE_DOWN)
    }, [])

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)',
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem'
            }}
        >
            {/* Portal Entry Animation */}
            <AnimatePresence>
                {isEntering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            pointerEvents: 'none'
                        }}
                    >
                        {/* Vortex effect */}
                        <motion.div
                            animate={{
                                scale: [0, 2, 1],
                                rotate: [0, 720],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '200vmax',
                                height: '200vmax',
                                borderRadius: '50%',
                                background: 'conic-gradient(from 0deg, transparent, #1a0033, #330066, transparent)',
                                filter: 'blur(20px)'
                            }}
                        />

                        {/* Static overlay */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 0.1, repeat: 20 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                                opacity: 0.15,
                                mixBlendMode: 'overlay'
                            }}
                        />

                        {/* Glitch bars */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: ['-100%', '100%'],
                                    scaleY: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: i * 0.1,
                                    repeat: 3
                                }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: `${i * 20}%`,
                                    width: '100%',
                                    height: '5%',
                                    background: `linear-gradient(90deg, 
                                        transparent, 
                                        rgba(255, 0, 255, 0.3), 
                                        rgba(0, 255, 0, 0.3),
                                        transparent)`,
                                    mixBlendMode: 'screen'
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Flickering overlay */}
            <motion.div
                animate={{
                    opacity: flickerState ? 0.1 : 0
                }}
                transition={{ duration: 0.1 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#000000',
                    pointerEvents: 'none',
                    zIndex: 100
                }}
            />

            {/* Floating fog particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`fog-${i}`}
                    animate={{
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${100 + Math.random() * 150}px`,
                        height: `${50 + Math.random() * 100}px`,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(100, 50, 150, 0.2) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />
            ))}

            {/* Flickering lights at top */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '1rem',
                    zIndex: 10
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`light-${i}`}
                        animate={{
                            opacity: flickerState ? [0.8, 0.3, 0.8] : [0.3, 0.1, 0.3],
                            filter: flickerState
                                ? 'drop-shadow(0 0 20px rgba(255, 100, 100, 0.8))'
                                : 'drop-shadow(0 0 5px rgba(255, 100, 100, 0.3))'
                        }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: '#ff6464',
                            boxShadow: '0 0 15px rgba(255, 100, 100, 0.5)'
                        }}
                    />
                ))}
            </div>

            {/* Back button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 100, 100, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/hub')}
                style={{
                    position: 'absolute',
                    top: '5rem',
                    left: '2rem',
                    background: 'rgba(50, 20, 70, 0.3)',
                    border: '2px solid rgba(255, 100, 100, 0.4)',
                    borderRadius: '50px',
                    padding: '10px 24px',
                    color: '#ff6464',
                    fontSize: '1rem',
                    fontFamily: "'Pacifico', cursive",
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    zIndex: 200
                }}
            >
                ← Exit Portal
            </motion.button>

            {/* Stranger Things Title */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1, type: 'spring' }}
                style={{
                    textAlign: 'center',
                    marginTop: '5rem',
                    marginBottom: '1rem'
                }}
            >
                <motion.h1
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(255, 50, 50, 1), 0 0 40px rgba(255, 50, 50, 0.8)',
                            '0 0 30px rgba(255, 50, 50, 1), 0 0 60px rgba(255, 50, 50, 0.8)',
                            '0 0 20px rgba(255, 50, 50, 1), 0 0 40px rgba(255, 50, 50, 0.8)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        fontFamily: "'Benguiat', 'Times New Roman', serif",
                        fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                        color: '#ff3232',
                        fontWeight: 'bold',
                        letterSpacing: 'clamp(8px, 2vw, 18px)',
                        textTransform: 'uppercase',
                        margin: 0,
                        textShadow: '0 0 20px rgba(255, 50, 50, 1), 0 0 40px rgba(255, 50, 50, 0.8)',
                        WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    The Upside Down
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 2.5 }}
                    style={{
                        fontFamily: "'Benguiat', 'Times New Roman', serif",
                        fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
                        color: '#ff8888',
                        letterSpacing: '4px',
                        marginTop: '0.5rem',
                        textTransform: 'uppercase',
                        fontWeight: '300'
                    }}
                >
                    Stranger Things Edition
                </motion.p>
            </motion.div>

            {/* Photo Gallery */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    padding: '2rem',
                    zIndex: 50,
                    position: 'relative'
                }}
            >
                {UPSIDE_DOWN_PHOTOS.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0
                        }}
                        transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
                        whileHover={{ scale: 1.05, zIndex: 100 }}
                        style={{
                            position: 'relative',
                            background: 'rgba(20, 10, 30, 0.6)',
                            padding: '15px',
                            borderRadius: '10px',
                            border: '2px solid rgba(255, 100, 100, 0.3)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Chromatic aberration effect */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4/5',
                                overflow: 'hidden',
                                borderRadius: '5px',
                                background: '#000'
                            }}
                        >
                            <img
                                src={photo.src}
                                alt={`Memory ${photo.id}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: `
                                        brightness(0.65)
                                        contrast(1.3)
                                        saturate(0.6)
                                        sepia(0.2)
                                        hue-rotate(180deg)
                                    `
                                }}
                            />

                            {/* Blue-green Upside Down overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(0, 50, 80, 0.4), rgba(20, 80, 60, 0.3))',
                                    mixBlendMode: 'overlay',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Floating spores */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`spore-${photo.id}-${i}`}
                                    animate={{
                                        y: [0, -100],
                                        x: [0, (Math.random() - 0.5) * 40],
                                        opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 3
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: `${Math.random() * 100}%`,
                                        bottom: '0',
                                        width: '3px',
                                        height: '3px',
                                        borderRadius: '50%',
                                        background: 'rgba(150, 200, 180, 0.6)',
                                        boxShadow: '0 0 4px rgba(150, 200, 180, 0.8)',
                                        pointerEvents: 'none'
                                    }}
                                />
                            ))}

                            {/* Scan lines */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Glitch overlay */}
                            <motion.div
                                animate={{
                                    opacity: flickerState ? 0 : [0, 0.3, 0],
                                    x: flickerState ? 0 : [-5, 5, -5, 0]
                                }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `linear-gradient(90deg, 
                                        rgba(255, 0, 255, 0.2), 
                                        transparent, 
                                        rgba(0, 255, 0, 0.2))`,
                                    mixBlendMode: 'screen'
                                }}
                            />

                            {/* Secret message overlay */}
                            <AnimatePresence>
                                {showSecret === index && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'rgba(0, 0, 0, 0.85)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '1.5rem',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <motion.p
                                            animate={{
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            style={{
                                                color: '#ff6464',
                                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                                fontFamily: "'Courier New', monospace",
                                                textShadow: '0 0 10px rgba(255, 100, 100, 0.8)',
                                                letterSpacing: '1px',
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {photo.secret}
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Photo label */}
                        <p
                            style={{
                                marginTop: '0.8rem',
                                color: '#ff6496',
                                fontSize: '1.3rem',
                                fontFamily: "'Pacifico', cursive",
                                textAlign: 'center',
                                letterSpacing: '2px',
                                textShadow: '0 0 10px rgba(255, 100, 150, 0.6)'
                            }}
                        >
                            {['💕', 'girl', 'beautiful', 'most', 'the'][photo.id - 1]}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Bottom atmospheric effect */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(to top, rgba(50, 20, 70, 0.3), transparent)',
                    pointerEvents: 'none',
                    zIndex: 5
                }}
            />
        </div>
    )
}

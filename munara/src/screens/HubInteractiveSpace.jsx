import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CARDS, isCardCompleted, areAllCardsCompleted } from '../utils/progress'

const SYMBOLS = [
    { id: CARDS.PUZZLE, symbol: '💐', title: 'Puzzle', route: '/activity/puzzle', delay: 0 },
    { id: CARDS.PRAGUE, symbol: '🏰', title: 'Prague', route: '/activity/prague', delay: 0.1 },
    { id: CARDS.CONSTELLATION, symbol: '⭐', title: 'Constellation', route: '/activity/constellation', delay: 0.2 },
    { id: CARDS.MUSIC, symbol: '🎵', title: 'Music', route: '/music', delay: 0.3, mystical: true },
    { id: CARDS.MAGIC_BALL, symbol: '🎱', title: 'Fortune', route: '/magic-ball', delay: 0.4, mystical: true },
    { id: CARDS.UPSIDE_DOWN, symbol: '🌀', title: 'Portal', route: '/upside-down', delay: 0.5, mystical: true }
]

const ROMANTIC_QUOTES = [
    'You are my new life ✨',
    'In you, I\'ve found the new life 💖',
    'Together is my favorite place to be 🌸'
]

const PHOTO_SECRETS = [
    'Слишком красива 💕',
    'Каждый день общения с тобой - подарок 💖',
    'Ты освещаешь многие жизни, и я очень рад что моя жизнь теперь освещена тобой ✨',
    'Твоя улыбка - самое прекрасное что я видел 🌸',
    'С тобой каждый момент становится особенным 💫'
]

// Decorative Components
const WavyLayer = ({ color, opacity, delay = 0 }) => (
    <motion.div
        animate={{
            x: [0, 50, 0],
            y: [0, -30, 0]
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '300px',
            opacity,
            pointerEvents: 'none',
            zIndex: 1
        }}
    >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path
                fill={color}
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
    </motion.div>
)

const FloatingCloud = ({ size = 100, x, y, delay = 0 }) => (
    <motion.div
        animate={{
            x: [0, 30, 0],
            y: [0, -20, 0]
        }}
        transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size * 0.6}px`,
            zIndex: 2,
            pointerEvents: 'none'
        }}
    >
        <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
            <ellipse cx="25" cy="40" rx="20" ry="18" fill="white" opacity="0.7" />
            <ellipse cx="50" cy="30" rx="30" ry="25" fill="white" opacity="0.7" />
            <ellipse cx="75" cy="40" rx="20" ry="18" fill="white" opacity="0.7" />
        </svg>
    </motion.div>
)

const ElegantHeart = ({ x, y, size = 30, delay = 0 }) => (
    <motion.div
        animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            zIndex: 3,
            pointerEvents: 'none'
        }}
    >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id={`heartGradient-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b9d" />
                    <stop offset="100%" stopColor="#ffa6b8" />
                </linearGradient>
            </defs>
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartGradient-${x}-${y})`}
            />
        </svg>
    </motion.div>
)

// Filled Solid Heart
const FilledHeart = ({ x, y, size = 40, color = "#ff4d7a", delay = 0, rotate = 0 }) => (
    <motion.div
        animate={{
            scale: [1, 1.05, 1],
            rotate: [rotate, rotate + 5, rotate]
        }}
        transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            zIndex: 3,
            pointerEvents: 'none'
        }}
    >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={color}
            />
        </svg>
    </motion.div>
)

// Outline Heart (hollow)
const OutlineHeart = ({ x, y, size = 35, color = "#ffffff", delay = 0, rotate = 0 }) => (
    <motion.div
        animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8],
            rotate: [rotate, rotate - 5, rotate]
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            zIndex: 3,
            pointerEvents: 'none'
        }}
    >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />
        </svg>
    </motion.div>
)

// Hanging Heart (with string)
const HangingHeart = ({ x, y, size = 38, stringLength = 40, delay = 0 }) => (
    <motion.div
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
    >
        {/* String */}
        <motion.div
            animate={{
                scaleY: [1, 1.05, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
            style={{
                width: '2px',
                height: `${stringLength}px`,
                background: 'rgba(255, 255, 255, 0.6)',
                transformOrigin: 'top'
            }}
        />

        {/* Heart */}
        <motion.div
            animate={{
                rotate: [-3, 3, -3],
                y: [0, 5, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}
        >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id={`hangingGradient-${x}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff3366" />
                        <stop offset="100%" stopColor="#ff6699" />
                    </linearGradient>
                </defs>
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={`url(#hangingGradient-${x})`}
                />
            </svg>
        </motion.div>
    </motion.div>
)

export default function HubInteractiveSpace() {
    const navigate = useNavigate()
    const [completedCount, setCompletedCount] = useState(0)
    const [showCelebration, setShowCelebration] = useState(0)
    const [celebrationCard, setCelebrationCard] = useState(null)
    const [currentQuote, setCurrentQuote] = useState(0)
    const [flippedPhoto, setFlippedPhoto] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const allCompleted = areAllCardsCompleted()

    // Handle window resize for responsive design
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const count = SYMBOLS.filter(s => isCardCompleted(s.id)).length
        setCompletedCount(count)

        const lastCompletedCard = localStorage.getItem('last_completed_card')
        const currentCards = SYMBOLS.filter(s => isCardCompleted(s.id)).map(s => s.id)

        if (currentCards.length > 0 && lastCompletedCard !== currentCards[currentCards.length - 1]) {
            const justCompleted = SYMBOLS.find(s => s.id === currentCards[currentCards.length - 1])
            if (justCompleted) {
                setCelebrationCard(justCompleted)
                setShowCelebration(true)
                localStorage.setItem('last_completed_card', justCompleted.id)

                setTimeout(() => {
                    setShowCelebration(false)
                    setCelebrationCard(null)
                }, 3000)
            }
        }
    }, [])

    // Rotate romantic quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % ROMANTIC_QUOTES.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleSymbolClick = (route) => {
        navigate(route)
    }

    const handlePhotoClick = (index) => {
        setFlippedPhoto(flippedPhoto === index ? null : index)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                background: 'linear-gradient(135deg, #ffb6c1 0%, #ff9ec5 25%, #ff8fa8 50%, #ffb6c1 100%)'
            }}
        >
            {/* Wavy Background Layers */}
            <WavyLayer color="rgba(255, 182, 193, 0.3)" opacity={0.5} delay={0} />
            <WavyLayer color="rgba(255, 158, 197, 0.3)" opacity={0.4} delay={3} />
            <WavyLayer color="rgba(255, 143, 168, 0.3)" opacity={0.3} delay={6} />

            {/* Floating Clouds */}
            <FloatingCloud size={120} x={5} y={10} delay={0} />
            <FloatingCloud size={90} x={15} y={25} delay={2} />
            <FloatingCloud size={100} x={80} y={15} delay={1} />
            <FloatingCloud size={80} x={85} y={35} delay={3} />
            <FloatingCloud size={110} x={40} y={8} delay={4} />
            <FloatingCloud size={95} x={60} y={22} delay={1.5} />


            {/* Variety of Hearts */}
            {/* Gradient Hearts */}
            <ElegantHeart x={8} y={15} size={25} delay={0} />
            <ElegantHeart x={92} y={20} size={30} delay={0.5} />
            <ElegantHeart x={50} y={5} size={22} delay={2} />

            {/* Filled Solid Hearts */}
            <FilledHeart x={18} y={12} size={35} color="#ff3366" delay={0.3} rotate={-15} />
            <FilledHeart x={85} y={8} size={42} color="#ff4d7a" delay={1.2} rotate={10} />
            <FilledHeart x={12} y={78} size={38} color="#ff5588" delay={2.1} rotate={-8} />
            <FilledHeart x={88} y={82} size={33} color="#ff3366" delay={1.8} rotate={12} />

            {/* Outline Hearts */}
            <OutlineHeart x={28} y={18} size={30} color="#ffffff" delay={0.6} rotate={5} />
            <OutlineHeart x={72} y={25} size={35} color="#ffffff" delay={1.5} rotate={-10} />
            <OutlineHeart x={15} y={85} size={28} color="rgba(255, 255, 255, 0.9)" delay={2.3} rotate={8} />
            <OutlineHeart x={82} y={72} size={32} color="rgba(255, 255, 255, 0.95)" delay={1.1} rotate={-5} />

            {/* Hanging Hearts */}
            <HangingHeart x={35} y={3} size={36} stringLength={35} delay={0} />
            <HangingHeart x={65} y={5} size={40} stringLength={45} delay={0.8} />
            <HangingHeart x={50} y={2} size={34} stringLength={30} delay={1.6} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    textAlign: 'center',
                    paddingTop: 'clamp(2rem, 5vh, 3rem)',
                    position: 'relative',
                    zIndex: 100
                }}
            >
                <h1 style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    color: 'white',
                    margin: 0,
                    marginBottom: '0.5rem',
                    textShadow: '3px 3px 10px rgba(255, 77, 122, 0.4), 1px 1px 3px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '0.02em'
                }}>
                    My Valentine
                </h1>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentQuote}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(255, 77, 122, 0.3)'
                        }}
                    >
                        {ROMANTIC_QUOTES[currentQuote]}
                    </motion.p>
                </AnimatePresence>
            </motion.div>

            {/* Interactive Polaroid Photos */}
            {[0, 1, 2, 3, 4].map((index) => {
                const positions = isMobile ? [
                    { top: '12%', left: '2%', rotate: -8 },
                    { top: '12%', right: '2%', rotate: 6, left: 'auto' },
                    { bottom: '25%', left: '2%', rotate: -7 },
                    { top: '35%', right: '2%', rotate: -5, left: 'auto' },
                    { bottom: '25%', right: '2%', rotate: 8, left: 'auto' }
                ] : [
                    { top: '12%', left: '2%', rotate: -8 },
                    { top: '15%', right: '3%', rotate: 6, left: 'auto' },
                    { bottom: '8%', left: '3%', rotate: -7 },
                    { top: '45%', right: '5%', rotate: -5, left: 'auto' },
                    { bottom: '12%', right: '18%', rotate: 8, left: 'auto' }
                ]

                const captions = ['Munara 💕', 'Awesome 💖', 'Beautiful ✨', 'Gorgeous 🌸', 'Amazing 💫']

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotate: positions[index].rotate - 4, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            rotate: flippedPhoto === index ? 0 : positions[index].rotate,
                            scale: flippedPhoto === index ? 1.2 : 1
                        }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.8, type: 'spring' }}
                        whileHover={{ scale: flippedPhoto === index ? 1.2 : 1.05, rotate: flippedPhoto === index ? 0 : positions[index].rotate - 2, zIndex: 50 }}
                        onClick={() => handlePhotoClick(index)}
                        style={{
                            position: 'absolute',
                            ...positions[index],
                            width: isMobile ? '130px' : '180px',
                            background: 'white',
                            padding: isMobile ? '8px' : '12px',
                            paddingBottom: isMobile ? '25px' : '35px',
                            borderRadius: '8px',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25), 4px 4px 0px rgba(255, 77, 122, 0.3)',
                            cursor: 'pointer',
                            zIndex: flippedPhoto === index ? 60 : 4,
                            perspective: '1000px',
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {flippedPhoto === index ? (
                                <motion.div
                                    key="secret"
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    exit={{ rotateY: 90 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '4/5',
                                        background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa6b8 100%)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: isMobile ? '0.5rem' : '1rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <p style={{
                                        color: 'white',
                                        fontSize: isMobile ? '0.65rem' : 'clamp(0.8rem, 1.5vw, 0.9rem)',
                                        fontFamily: "'Pacifico', cursive",
                                        lineHeight: 1.4
                                    }}>
                                        {PHOTO_SECRETS[index]}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="photo"
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    exit={{ rotateY: 90 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '4/5'
                                    }}
                                >
                                    <img
                                        src={`/munara-${index + 1}.png`}
                                        alt={`Munara ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            display: 'block'
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontFamily: "'Pacifico', cursive",
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                            color: '#ff4d7a',
                            whiteSpace: 'nowrap'
                        }}>
                            {flippedPhoto === index ? 'Secret 💌' : captions[index]}
                        </div>
                    </motion.div>
                )
            })}

            {/* Final Letter - Appears when all cards completed */}
            {allCompleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: -3,
                        y: [0, -10, 0]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 1 },
                        scale: { type: 'spring', duration: 1, delay: 1 },
                        rotate: { duration: 0.5, delay: 1.2 },
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    whileHover={{ scale: 1.1, rotate: 0, y: -15 }}
                    onClick={() => navigate('/letter')}
                    style={{
                        position: isMobile ? 'fixed' : 'absolute',
                        left: isMobile ? '50%' : '15%',
                        top: isMobile ? 'auto' : '50%',
                        bottom: isMobile ? '20px' : 'auto',
                        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
                        width: isMobile ? '110px' : 'clamp(140px, 16vw, 190px)',
                        background: 'white',
                        padding: isMobile ? '10px' : '15px',
                        paddingBottom: isMobile ? '25px' : '30px',
                        borderRadius: '10px',
                        boxShadow: '0 8px 25px rgba(255, 77, 122, 0.4), 0 0 0 3px #ff4d7a',
                        cursor: 'pointer',
                        zIndex: 60
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(135deg, #ff6b8a 0%, #ff91a4 50%, #ffa6b8 100%)',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(3rem, 5vw, 4rem)',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                        position: 'relative'
                    }}>
                        💌
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                    rotate: [0, 180]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity
                                }}
                                style={{
                                    position: 'absolute',
                                    left: `${Math.cos((i / 8) * Math.PI * 2) * 40 + 50}%`,
                                    top: `${Math.sin((i / 8) * Math.PI * 2) * 40 + 50}%`,
                                    fontSize: '1rem',
                                    pointerEvents: 'none'
                                }}
                            >
                                ✨
                            </motion.div>
                        ))}
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: "'Pacifico', cursive",
                        fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)',
                        color: '#ff4d7a',
                        whiteSpace: 'nowrap',
                        textAlign: 'center'
                    }}>
                        Открыть 💕
                    </div>
                </motion.div>
            )}

            {/* Centered Grid of Activity Cards */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    gap: isMobile ? '1rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: isMobile ? '1rem' : '2rem',
                    marginTop: isMobile ? '2rem' : '3rem',
                    maxWidth: isMobile ? '100%' : '1200px',
                    margin: '0 auto',
                    zIndex: 5
                }}
            >
                {SYMBOLS.map((item, index) => {
                    const isCompleted = isCardCompleted(item.id)

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                y: [0, -6, 0],
                            }}
                            transition={{
                                opacity: { delay: item.delay, duration: 0.6 },
                                scale: { delay: item.delay, type: 'spring', stiffness: 200 },
                                rotate: { delay: item.delay, duration: 0.8 },
                                y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }
                            }}
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.08,
                                    y: -10,
                                    boxShadow: isCompleted
                                        ? '6px 6px 0px rgba(255, 77, 122, 0.9)'
                                        : '6px 6px 0px rgba(255, 255, 255, 0.8)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    y: [0, -6, 0],
                                }}
                                transition={{
                                    y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }
                                }}
                                onClick={() => handleSymbolClick(item.route)}
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    background: isCompleted
                                        ? 'rgba(255, 255, 255, 0.95)'
                                        : 'rgba(255, 255, 255, 0.85)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '25px',
                                    border: isCompleted
                                        ? '4px solid #ff4d7a'
                                        : '4px solid rgba(255, 255, 255, 0.9)',
                                    boxShadow: isCompleted
                                        ? '4px 4px 0px #ff4d7a, 0 10px 30px rgba(255, 77, 122, 0.3)'
                                        : '3px 3px 0px rgba(255, 255, 255, 0.7), 0 10px 30px rgba(255, 255, 255, 0.2)',
                                    padding: isMobile ? '12px 8px' : '25px 20px',
                                    width: isMobile ? '100px' : '170px',
                                    height: isMobile ? '140px' : '210px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    overflow: 'visible',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {isCompleted && (
                                    <>
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0.5, 1.2, 0.5],
                                                    rotate: [0, 180, 360],
                                                    x: [0, Math.cos(i * 60) * 15, 0],
                                                    y: [0, Math.sin(i * 60) * 15, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.4
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    fontSize: '1.5rem',
                                                    pointerEvents: 'none',
                                                    filter: 'drop-shadow(1px 1px 0px white)'
                                                }}
                                            >
                                                ✨
                                            </motion.div>
                                        ))}
                                    </>
                                )}

                                <motion.div
                                    animate={{
                                        scale: isCompleted ? [1, 1.15, 1] : [1, 1.05, 1],
                                        rotate: isCompleted ? [0, 10, -10, 0] : [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: isCompleted ? 2 : 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                    style={{
                                        fontSize: isMobile ? '2.8rem' : '5rem',
                                        filter: isCompleted
                                            ? 'drop-shadow(3px 3px 0px rgba(255, 77, 122, 0.3))'
                                            : 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.3))'
                                    }}
                                >
                                    {item.symbol}
                                </motion.div>

                                <div style={{
                                    fontSize: '1.1rem',
                                    fontFamily: "'Pacifico', cursive",
                                    fontWeight: 400,
                                    color: isCompleted ? '#ff4d7a' : 'rgba(255, 77, 122, 0.5)',
                                    letterSpacing: '0.02em'
                                }}>
                                    {item.title}
                                </div>

                                <motion.div
                                    animate={isCompleted ? {
                                        scale: [1, 1.2, 1]
                                    } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    {isCompleted ? '💖' : '🤍'}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Progress with hearts */}
            <div style={{
                position: 'relative',
                marginTop: isMobile ? '2rem' : '3rem',
                marginBottom: isMobile ? '2rem' : '3rem',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
            }}>
                {allCompleted ? (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            color: 'white',
                            fontSize: '1.2rem',
                            textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>💖</span>
                        <span>All Complete!</span>
                        <span>💖</span>
                    </motion.div>
                ) : (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {[...Array(SYMBOLS.length)].map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1, type: 'spring' }}
                                style={{
                                    fontSize: '1.5rem',
                                    filter: 'drop-shadow(1px 1px 0px white)'
                                }}
                            >
                                {i < completedCount ? '💖' : '🤍'}
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>

            {/* DEBUG: Reset Progress Button */}
            <motion.button
                onClick={() => {
                    localStorage.removeItem('munara_progress')
                    localStorage.removeItem('last_completed_card')
                    window.location.reload()
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255, 77, 122, 0.6), 0 8px 25px rgba(255, 77, 122, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: [0, -3, 0]
                }}
                transition={{
                    y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }
                }}
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fa8 50%, #ffa6b8 100%)',
                    color: 'white',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '0.95rem',
                    zIndex: 1000,
                    boxShadow: '0 4px 15px rgba(255, 77, 122, 0.4)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: isMobile ? 'none' : 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    🔄
                </motion.span>
                Reset Progress

                {/* Sparkle decorations */}
                {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        style={{
                            position: 'absolute',
                            left: `${20 + i * 30}%`,
                            top: '-10px',
                            fontSize: '0.8rem',
                            pointerEvents: 'none'
                        }}
                    >
                        ✨
                    </motion.span>
                ))}
            </motion.button>

            {/* Celebration Modal */}
            <AnimatePresence>
                {showCelebration && celebrationCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 107, 138, 0.9)',
                            backdropFilter: 'blur(10px)',
                            pointerEvents: 'none'
                        }}
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, x: 0, y: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    x: Math.cos((i / 30) * Math.PI * 2) * 250,
                                    y: Math.sin((i / 30) * Math.PI * 2) * 250,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    fontSize: '2rem',
                                    filter: 'drop-shadow(2px 2px 0px white)'
                                }}
                            >
                                {['✨', '💖', '⭐', '💕'][i % 4]}
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '1rem',
                                filter: 'drop-shadow(3px 3px 0px white)'
                            }}>
                                {celebrationCard.symbol}
                            </div>
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontFamily: "'Pacifico', cursive",
                                color: 'white',
                                marginBottom: '0.5rem',
                                textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                            }}>
                                Completed!
                            </h2>
                            <p style={{
                                fontSize: '1.5rem',
                                color: 'white',
                                fontFamily: "'Pacifico', cursive"
                            }}>
                                {celebrationCard.title} ✨
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

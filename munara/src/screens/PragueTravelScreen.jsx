import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

const PRAGUE_LANDMARKS = [
    {
        id: 1,
        name: 'Карлов мост',
        nameEn: 'Charles Bridge',
        description: 'Знаменитый средневековый мост через Влтаву',
        emoji: '🌉',
        image: '/prague-charles-bridge.png',
        color: '#ff91a4',
        quiz: {
            question: 'Что это за знаменитая достопримечательность?',
            options: [
                'Карлов мост',
                'Тауэрский мост',
                'Понте Веккьо',
                'Бруклинский мост'
            ],
            correctIndex: 0
        }
    },
    {
        id: 2,
        name: 'Пражский град',
        nameEn: 'Prague Castle',
        description: 'Крупнейший древний замок в мире',
        emoji: '🏰',
        image: '/prague-castle.png',
        color: '#ffa6b8',
        quiz: {
            question: 'Какой это замок?',
            options: [
                'Версальский дворец',
                'Пражский град',
                'Виндзорский замок',
                'Нойшванштайн'
            ],
            correctIndex: 1
        }
    },
    {
        id: 3,
        name: 'Астрономические часы',
        nameEn: 'Astronomical Clock',
        description: 'Средневековые часы на Староместской площади',
        emoji: '🕰️',
        image: '/prague-clock.png',
        color: '#ff6b8a',
        quiz: {
            question: 'Что это за историческая достопримечательность?',
            options: [
                'Биг-Бен',
                'Часы Цитглогге',
                'Астрономические часы',
                'Часовая башня в Венеции'
            ],
            correctIndex: 2
        }
    },
    {
        id: 4,
        name: 'Танцующий дом',
        nameEn: 'Dancing House',
        description: 'Уникальное здание деконструктивистской архитектуры',
        emoji: '🏢',
        image: '/prague-dancing-house.png',
        color: '#ff8fa8',
        quiz: {
            question: 'Как называется это необычное здание?',
            options: [
                'Кривой домик',
                'Танцующий дом',
                'Атомиум',
                'Хабитат 67'
            ],
            correctIndex: 1
        }
    }
]

export default function PragueTravelScreen() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState('intro') // intro, travel, quiz, favorite, dinner, complete
    const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [visitedLandmarks, setVisitedLandmarks] = useState([])
    const [favoriteLandmark, setFavoriteLandmark] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)

    const currentLandmark = PRAGUE_LANDMARKS[currentLandmarkIndex]

    const handleStartJourney = () => {
        setCurrentStep('travel')
        setTimeout(() => {
            setCurrentStep('quiz')
        }, 2000)
    }

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index)
        const isCorrect = index === currentLandmark.quiz.correctIndex

        if (isCorrect) {
            setScore(prev => prev + 1)
        }

        setShowFeedback(true)

        setTimeout(() => {
            setShowFeedback(false)
            setSelectedAnswer(null)
            setVisitedLandmarks(prev => [...prev, currentLandmark])

            if (currentLandmarkIndex < PRAGUE_LANDMARKS.length - 1) {
                setCurrentStep('travel')
                setTimeout(() => {
                    setCurrentLandmarkIndex(prev => prev + 1)
                    setCurrentStep('quiz')
                }, 2000)
            } else {
                setCurrentStep('favorite')
            }
        }, 2000)
    }

    const handleFavoriteSelect = (landmark) => {
        setFavoriteLandmark(landmark)
        setCurrentStep('dinner')

        setTimeout(() => {
            setCurrentStep('complete')
            setTimeout(() => {
                completeCard(CARDS.PRAGUE)
                window.location.href = '/hub'
            }, 3000)
        }, 5000)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #ff6b8a 0%, #ff91a4 50%, #ffa6b8 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Wavy background layers */}
            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -25, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '250px',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            >
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path
                        fill="rgba(255, 107, 138, 0.3)"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </motion.div>

            <motion.div
                animate={{
                    x: [0, -35, 0],
                    y: [0, 20, 0]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    opacity: 0.35,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            >
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path
                        fill="rgba(255, 143, 168, 0.3)"
                        d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,192C672,181,768,171,864,154.7C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </motion.div>

            {/* Floating clouds */}
            {[
                { size: 110, x: 8, y: 12, delay: 0 },
                { size: 90, x: 85, y: 18, delay: 2 },
                { size: 100, x: 45, y: 8, delay: 4 },
                { size: 80, x: 20, y: 75, delay: 1.5 },
                { size: 95, x: 75, y: 80, delay: 3 }
            ].map((cloud, i) => (
                <motion.div
                    key={`cloud-${i}`}
                    animate={{
                        x: [0, 25, 0],
                        y: [0, -15, 0]
                    }}
                    transition={{
                        duration: 14 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: cloud.delay
                    }}
                    style={{
                        position: 'absolute',
                        left: `${cloud.x}%`,
                        top: `${cloud.y}%`,
                        width: `${cloud.size}px`,
                        height: `${cloud.size * 0.6}px`,
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                >
                    <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
                        <ellipse cx="25" cy="40" rx="20" ry="18" fill="white" opacity="0.6" />
                        <ellipse cx="50" cy="30" rx="30" ry="25" fill="white" opacity="0.6" />
                        <ellipse cx="75" cy="40" rx="20" ry="18" fill="white" opacity="0.6" />
                    </svg>
                </motion.div>
            ))}

            {/* Sparkling stars */}
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${0.8 + Math.random() * 0.8}rem`,
                        pointerEvents: 'none',
                        zIndex: 3
                    }}
                >
                    ✨
                </motion.div>
            ))}

            {/* Landmark decorations - rotating and moving */}
            {[
                { emoji: '🏰', x: 10, y: 20, delay: 0, size: 2.5 },
                { emoji: '🌉', x: 88, y: 25, delay: 0.5, size: 2.2 },
                { emoji: '🕰️', x: 15, y: 82, delay: 1, size: 2.3 },
                { emoji: '🏢', x: 85, y: 75, delay: 1.5, size: 2.4 },
                { emoji: '🎭', x: 50, y: 10, delay: 2, size: 2 },
                { emoji: '🎪', x: 30, y: 88, delay: 2.5, size: 2.1 }
            ].map((landmark, i) => (
                <motion.div
                    key={`landmark-${i}`}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: landmark.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${landmark.x}%`,
                        top: `${landmark.y}%`,
                        fontSize: `${landmark.size}rem`,
                        pointerEvents: 'none',
                        opacity: 0.5,
                        zIndex: 3,
                        filter: 'drop-shadow(2px 2px 4px rgba(255, 77, 122, 0.3))'
                    }}
                >
                    {landmark.emoji}
                </motion.div>
            ))}

            {/* Floating hearts */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        delay: i * 0.8
                    }}
                    style={{
                        position: 'absolute',
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        fontSize: '1.8rem',
                        pointerEvents: 'none',
                        opacity: 0.4,
                        zIndex: 3
                    }}
                >
                    💕
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                {/* Intro Screen */}
                {currentStep === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        style={{
                            textAlign: 'center',
                            maxWidth: '600px'
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: '8rem', marginBottom: '1rem' }}
                        >
                            🇨🇿
                        </motion.div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                            fontFamily: "'Pacifico', cursive",
                            color: 'white',
                            textShadow: '3px 3px 0px #ff4d7a, -2px -2px 0px #ff8fa8',
                            marginBottom: '1rem'
                        }}>
                            Путешествие по Праге
                        </h1>

                        <p style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: '1.2rem',
                            color: 'white',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                            textShadow: '2px 2px 4px rgba(255, 77, 122, 0.3)'
                        }}>
                            Отправься в романтическое путешествие<br />
                            по самым красивым местам Праги! 💕
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartJourney}
                            style={{
                                background: 'white',
                                border: '4px solid #ff4d7a',
                                borderRadius: '50px',
                                padding: '15px 40px',
                                fontFamily: "'Pacifico', cursive",
                                fontSize: '1.5rem',
                                color: '#ff4d7a',
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0px #ff4d7a',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Начать путешествие ✈️
                        </motion.button>
                    </motion.div>
                )}

                {/* Travel Animation */}
                {currentStep === 'travel' && (
                    <motion.div
                        key="travel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}
                    >
                        <h2 style={{
                            fontSize: '3rem',
                            fontFamily: "'Pacifico', cursive",
                            color: 'white',
                            textShadow: '3px 3px 0px #ff4d7a',
                            marginTop: '10rem'
                        }}>
                            Идём дальшее :)
                        </h2>
                    </motion.div>
                )}

                {/* Quiz Screen */}
                {currentStep === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            textAlign: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            style={{
                                marginBottom: '2rem',
                                position: 'relative'
                            }}
                        >
                            <img
                                src={currentLandmark.image}
                                alt={currentLandmark.name}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    borderRadius: '25px',
                                    border: '5px solid white',
                                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3), 5px 5px 0px #ff4d7a',
                                    objectFit: 'cover'
                                }}
                            />
                        </motion.div>

                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontFamily: "'Pacifico', cursive",
                            color: 'white',
                            textShadow: '3px 3px 0px #ff4d7a',
                            marginBottom: '2rem'
                        }}>
                            {currentLandmark.quiz.question}
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}>
                            {currentLandmark.quiz.options.map((option, index) => {
                                const isSelected = selectedAnswer === index
                                const isCorrect = index === currentLandmark.quiz.correctIndex

                                let bgColor = 'white'
                                let borderColor = '#ff4d7a'

                                if (showFeedback && isSelected) {
                                    bgColor = isCorrect ? '#4ade80' : '#f87171'
                                    borderColor = isCorrect ? '#22c55e' : '#ef4444'
                                }

                                return (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => !showFeedback && handleAnswerSelect(index)}
                                        disabled={showFeedback}
                                        style={{
                                            background: bgColor,
                                            border: `4px solid ${borderColor}`,
                                            borderRadius: '20px',
                                            padding: '20px',
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: '1.1rem',
                                            color: showFeedback && isSelected ? 'white' : '#ff4d7a',
                                            cursor: showFeedback ? 'default' : 'pointer',
                                            boxShadow: `4px 4px 0px ${borderColor}`,
                                            transition: 'all 0.2s ease',
                                            opacity: showFeedback ? (isSelected ? 1 : 0.5) : 1
                                        }}
                                    >
                                        {option}
                                    </motion.button>
                                )
                            })}
                        </div>

                        {showFeedback && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    fontSize: '3rem',
                                    fontFamily: "'Pacifico', cursive",
                                    color: 'white',
                                    textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)'
                                }}
                            >
                                {selectedAnswer === currentLandmark.quiz.correctIndex
                                    ? '🎉 Правильно! 🎉'
                                    : '💖 Хорошая попытка! 💖'}
                            </motion.div>
                        )}

                        <div style={{
                            marginTop: '2rem',
                            fontFamily: "'Pacifico', cursive",
                            fontSize: '1.2rem',
                            color: 'white',
                            textShadow: '2px 2px 0px rgba(255, 77, 122, 0.3)'
                        }}>
                            Прогресс: {currentLandmarkIndex + 1} / {PRAGUE_LANDMARKS.length}
                        </div>
                    </motion.div>
                )}

                {/* Favorite Selection */}
                {currentStep === 'favorite' && (
                    <motion.div
                        key="favorite"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            width: '100%',
                            maxWidth: '900px',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 6vw, 3rem)',
                            fontFamily: "'Pacifico', cursive",
                            color: 'white',
                            textShadow: '3px 3px 0px #ff4d7a',
                            marginBottom: '1rem'
                        }}>
                            Какое место понравилось больше всего? 💕
                        </h2>

                        <p style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: '1.2rem',
                            color: 'white',
                            marginBottom: '2rem',
                            textShadow: '2px 2px 0px rgba(255, 77, 122, 0.3)'
                        }}>
                            Правильных ответов: {score} из {PRAGUE_LANDMARKS.length} 🎯
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {PRAGUE_LANDMARKS.map((landmark) => (
                                <motion.div
                                    key={landmark.id}
                                    whileHover={{ scale: 1.05, y: -8 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleFavoriteSelect(landmark)}
                                    style={{
                                        background: 'white',
                                        border: '4px solid #ff4d7a',
                                        borderRadius: '25px',
                                        padding: '15px',
                                        cursor: 'pointer',
                                        boxShadow: '4px 4px 0px #ff4d7a',
                                        transition: 'all 0.2s ease',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={landmark.image}
                                        alt={landmark.name}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '15px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <h3 style={{
                                        fontFamily: "'Pacifico', cursive",
                                        fontSize: '1.3rem',
                                        color: '#ff4d7a',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {landmark.name}
                                    </h3>
                                    <p style={{
                                        fontFamily: "'Pacifico', cursive",
                                        fontSize: '0.9rem',
                                        color: '#ff8fa8'
                                    }}>
                                        {landmark.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Dinner Cutscene */}
                {currentStep === 'dinner' && favoriteLandmark && (
                    <motion.div
                        key="dinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: `linear-gradient(135deg, ${favoriteLandmark.color}aa 0%, ${favoriteLandmark.color}dd 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative'
                        }}>
                            {/* Landmark image background */}
                            <motion.div
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.4 }}
                                transition={{ duration: 2 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${favoriteLandmark.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'blur(8px)',
                                    zIndex: 1
                                }}
                            />

                            {/* Animated dinner scene */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                                overflow: 'hidden'
                            }}>
                                {/* Night sky with stars */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to bottom, #0a1929 0%, #1e3a5f 50%, #2d4a7c 100%)'
                                }}>
                                    {/* Twinkling stars */}
                                    {[...Array(50)].map((_, i) => (
                                        <motion.div
                                            key={`star-${i}`}
                                            animate={{
                                                opacity: [0.2, 1, 0.2],
                                                scale: [0.8, 1.2, 0.8]
                                            }}
                                            transition={{
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 2
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 60}%`,
                                                width: '3px',
                                                height: '3px',
                                                background: 'white',
                                                borderRadius: '50%',
                                                boxShadow: '0 0 4px white'
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Prague skyline silhouette */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 0.3 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '35%',
                                        width: '100%',
                                        height: '30%',
                                        background: `linear-gradient(to bottom, transparent, ${favoriteLandmark.color}40)`,
                                        clipPath: 'polygon(0 60%, 5% 55%, 8% 40%, 12% 45%, 15% 30%, 18% 35%, 22% 50%, 28% 45%, 32% 35%, 38% 40%, 42% 25%, 48% 30%, 52% 45%, 58% 40%, 62% 20%, 68% 35%, 72% 45%, 78% 50%, 82% 40%, 88% 55%, 92% 50%, 96% 60%, 100% 65%, 100% 100%, 0 100%)'
                                    }}
                                />

                                {/* Main content container */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 1.2, type: 'spring' }}
                                    style={{
                                        position: 'relative',
                                        zIndex: 10,
                                        textAlign: 'center',
                                        width: '90%',
                                        maxWidth: '900px'
                                    }}
                                >
                                    {/* Title */}
                                    <motion.h2
                                        animate={{
                                            textShadow: [
                                                '0 0 20px rgba(255, 215, 0, 0.6)',
                                                '0 0 40px rgba(255, 215, 0, 0.8)',
                                                '0 0 20px rgba(255, 215, 0, 0.6)'
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                                            fontFamily: "'Pacifico', cursive",
                                            color: '#ffd700',
                                            marginBottom: '1rem',
                                            textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 3px 3px 0px rgba(0, 0, 0, 0.5)'
                                        }}
                                    >
                                        Perfect Evening 💫
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        style={{
                                            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                                            fontFamily: "'Pacifico', cursive",
                                            color: 'white',
                                            marginBottom: '3rem',
                                            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)'
                                        }}
                                    >
                                        Romantic dinner with a view of {favoriteLandmark.name}
                                    </motion.p>

                                    {/* Table scene */}
                                    <div style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        perspective: '1000px'
                                    }}>
                                        {/* Table */}
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: 1, duration: 0.8 }}
                                            style={{
                                                width: 'clamp(300px, 50vw, 500px)',
                                                height: '20px',
                                                background: 'linear-gradient(to bottom, #8B4513 0%, #654321 100%)',
                                                borderRadius: '100px / 10px',
                                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                                                position: 'relative',
                                                transformOrigin: 'top'
                                            }}
                                        >
                                            {/* Tablecloth */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                left: '5%',
                                                width: '90%',
                                                height: '30px',
                                                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                                                borderRadius: '50%',
                                                boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)'
                                            }} />

                                            {/* Candles */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1.5, type: 'spring' }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-60px',
                                                    left: '45%',
                                                    display: 'flex',
                                                    gap: '15px'
                                                }}
                                            >
                                                {[0, 1].map((i) => (
                                                    <div key={i} style={{ position: 'relative' }}>
                                                        {/* Candle body */}
                                                        <div style={{
                                                            width: '12px',
                                                            height: '40px',
                                                            background: 'linear-gradient(to right, #ff6b9d 0%, #ffa6c1 50%, #ff6b9d 100%)',
                                                            borderRadius: '5px 5px 0 0',
                                                            position: 'relative'
                                                        }}>
                                                            {/* Wick */}
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '-3px',
                                                                left: '50%',
                                                                transform: 'translateX(-50%)',
                                                                width: '2px',
                                                                height: '5px',
                                                                background: '#333'
                                                            }} />

                                                            {/* Flame */}
                                                            <motion.div
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    y: [-8, -12, -8]
                                                                }}
                                                                transition={{
                                                                    duration: 1 + i * 0.2,
                                                                    repeat: Infinity,
                                                                    ease: 'easeInOut'
                                                                }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '-12px',
                                                                    left: '50%',
                                                                    transform: 'translateX(-50%)',
                                                                    width: '16px',
                                                                    height: '20px',
                                                                    background: 'radial-gradient(ellipse at center, #ffeb3b 0%, #ff9800 40%, #ff5722 70%, transparent 100%)',
                                                                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                                                    filter: 'blur(1px)',
                                                                    boxShadow: '0 0 20px rgba(255, 183, 77, 0.8)'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>

                                            {/* Champagne glasses */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -20 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 1.8, type: 'spring', bounce: 0.5 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-45px',
                                                    left: '15%',
                                                    display: 'flex',
                                                    gap: '10px'
                                                }}
                                            >
                                                {/* Glass 1 */}
                                                <motion.div
                                                    animate={{ rotate: [-2, 2, -2] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    style={{
                                                        position: 'relative',
                                                        width: '30px',
                                                        height: '35px'
                                                    }}
                                                >
                                                    {/* Glass cup */}
                                                    <div style={{
                                                        width: '30px',
                                                        height: '25px',
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(200,220,255,0.4) 100%)',
                                                        border: '2px solid rgba(255, 255, 255, 0.6)',
                                                        borderRadius: '0 0 40% 40%',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {/* Champagne */}
                                                        <div style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            width: '100%',
                                                            height: '60%',
                                                            background: 'linear-gradient(to top, #ffd700 0%, #fff9c4 100%)',
                                                            opacity: 0.7
                                                        }} />
                                                        {/* Bubbles */}
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                animate={{
                                                                    y: [0, -20],
                                                                    opacity: [1, 0]
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: Infinity,
                                                                    delay: i * 0.5
                                                                }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    bottom: '5px',
                                                                    left: `${20 + i * 20}%`,
                                                                    width: '3px',
                                                                    height: '3px',
                                                                    background: 'white',
                                                                    borderRadius: '50%'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    {/* Stem */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '-10px',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '2px',
                                                        height: '10px',
                                                        background: 'rgba(255, 255, 255, 0.5)'
                                                    }} />
                                                </motion.div>

                                                {/* Glass 2 (mirror) */}
                                                <motion.div
                                                    animate={{ rotate: [2, -2, 2] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    style={{
                                                        position: 'relative',
                                                        width: '30px',
                                                        height: '35px'
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '30px',
                                                        height: '25px',
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(200,220,255,0.4) 100%)',
                                                        border: '2px solid rgba(255, 255, 255, 0.6)',
                                                        borderRadius: '0 0 40% 40%',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            width: '100%',
                                                            height: '60%',
                                                            background: 'linear-gradient(to top, #ffd700 0%, #fff9c4 100%)',
                                                            opacity: 0.7
                                                        }} />
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                animate={{
                                                                    y: [0, -20],
                                                                    opacity: [1, 0]
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: Infinity,
                                                                    delay: i * 0.5 + 0.3
                                                                }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    bottom: '5px',
                                                                    left: `${20 + i * 20}%`,
                                                                    width: '3px',
                                                                    height: '3px',
                                                                    background: 'white',
                                                                    borderRadius: '50%'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '-10px',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '2px',
                                                        height: '10px',
                                                        background: 'rgba(255, 255, 255, 0.5)'
                                                    }} />
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Fireworks */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={`firework-${i}`}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: [0, 1.5, 0],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: 2 + i * 0.3,
                                                repeat: Infinity,
                                                repeatDelay: 6
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: `${20 + (i % 4) * 20}%`,
                                                top: `${10 + Math.floor(i / 4) * 30}%`,
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                background: `radial-gradient(circle, ${['#ff6b9d', '#ffd700', '#4ade80', '#60a5fa'][i % 4]} 0%, transparent 70%)`,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    ))}

                                    {/* Floating hearts */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={`heart-${i}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{
                                                y: -200,
                                                opacity: [0, 1, 0],
                                                x: Math.sin(i) * 60,
                                                rotate: [0, 360]
                                            }}
                                            transition={{
                                                duration: 4,
                                                delay: i * 0.3,
                                                repeat: Infinity
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: `${i * 8}%`,
                                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            💕
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Complete Screen */}
                {currentStep === 'complete' && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            textAlign: 'center',
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(255, 107, 138, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 200
                        }}
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, x: 0, y: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    x: Math.cos((i / 30) * Math.PI * 2) * 300,
                                    y: Math.sin((i / 30) * Math.PI * 2) * 300,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 2, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    fontSize: '3rem'
                                }}
                            >
                                {['🏰', '❤️', '✨', '💖'][i % 4]}
                            </motion.div>
                        ))}

                        <div>
                            <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>
                                🇨🇿💕
                            </div>
                            <h2 style={{
                                fontSize: '4rem',
                                fontFamily: "'Pacifico', cursive",
                                color: 'white',
                                textShadow: '3px 3px 0px rgba(255, 77, 122, 0.6)',
                                marginBottom: '1rem'
                            }}>
                                Незабываемое путешествие!
                            </h2>
                            <p style={{
                                fontSize: '1.8rem',
                                fontFamily: "'Pacifico', cursive",
                                color: 'white',
                                textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)'
                            }}>
                                Спасибо за прогулку по Праге 💖
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

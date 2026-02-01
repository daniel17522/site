import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'
import {
    CARDS,
    isCardCompleted,
    isCardUnlocked,
    areAllCardsCompleted,
    getCompletionPercentage
} from '../utils/progress'
import ActivityCard from '../components/ActivityCard'

const ACTIVITY_CARDS = [
    {
        id: CARDS.EMOTIONS,
        icon: '🌸',
        title: 'Эмоции',
        description: 'Поймай настроение момента',
        route: '/activity/emotions'
    },
    {
        id: CARDS.SILENCE,
        icon: '🌊',
        title: 'Момент тишины',
        description: 'Важно просто почувствовать',
        route: '/activity/silence'
    },
    {
        id: CARDS.CHOICE,
        icon: '📖',
        title: 'Выбор',
        description: 'Нет правильных ответов',
        route: '/activity/choice'
    },
    {
        id: CARDS.CINEMA,
        icon: '🎬',
        title: 'Кино и реальность',
        description: 'Истории становятся личными',
        route: '/activity/cinema'
    },
    {
        id: CARDS.SKINS,
        icon: '🖤',
        title: 'Skins: Choices',
        description: 'Жизнь редко предлагает простой вариант',
        route: '/activity/skins'
    }
]

export default function HubMenuScreen() {
    const navigate = useNavigate()
    const allCompleted = areAllCardsCompleted()
    const completion = getCompletionPercentage()

    const getCardStatus = (cardId) => {
        if (isCardCompleted(cardId)) return 'completed'
        if (isCardUnlocked(cardId)) return 'available'
        return 'locked'
    }

    const handleCardClick = (route) => {
        navigate(route)
    }

    const handleLetterClick = () => {
        navigate('/letter')
    }

    return (
        <div
            className="screen"
            style={{
                background: 'var(--color-background)',
                padding: 'var(--space-lg)',
                minHeight: '100vh'
            }}
        >
            <div className="screen-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    {...animations.fadeIn}
                    className="text-center"
                    style={{ marginBottom: 'var(--space-xl)' }}
                >
                    <h1
                        style={{
                            fontSize: 'var(--text-2xl)',
                            fontFamily: 'var(--font-display)',
                            color: 'var(--color-text)',
                            lineHeight: 1.5,
                            marginBottom: 'var(--space-md)'
                        }}
                    >
                        Маленькая история,<br />
                        которую можно открыть<br />
                        шаг за шагом
                    </h1>

                    {/* Progress indicator */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            height: '4px',
                            background: 'var(--gradient-primary)',
                            borderRadius: 'var(--radius-full)',
                            margin: '0 auto',
                            maxWidth: '200px'
                        }}
                    />
                    <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-light)',
                        marginTop: 'var(--space-xs)'
                    }}>
                        {completion}% пройдено
                    </p>
                </motion.div>

                {/* Activity Cards Grid */}
                <motion.div
                    variants={animations.staggerContainer}
                    initial="initial"
                    animate="animate"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: 'var(--space-md)',
                        marginBottom: 'var(--space-xl)'
                    }}
                >
                    {ACTIVITY_CARDS.map((card) => (
                        <ActivityCard
                            key={card.id}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            status={getCardStatus(card.id)}
                            onClick={() => handleCardClick(card.route)}
                        />
                    ))}
                </motion.div>

                {/* Final Letter Card - Only shown when all activities completed */}
                {allCompleted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLetterClick}
                            className="card glass"
                            style={{
                                padding: 'var(--space-xl)',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, rgba(255, 201, 229, 0.3) 0%, rgba(229, 212, 255, 0.3) 100%)',
                                border: '2px solid var(--color-primary)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '150px',
                                    height: '150px',
                                    background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                                    filter: 'blur(40px)',
                                    pointerEvents: 'none'
                                }}
                            />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-sm)' }}>
                                    💌
                                </div>
                                <h2 style={{
                                    fontSize: 'var(--text-2xl)',
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--color-text)',
                                    marginBottom: 'var(--space-xs)'
                                }}>
                                    Письмо
                                </h2>
                                <p style={{
                                    fontSize: 'var(--text-base)',
                                    color: 'var(--color-text-light)',
                                    fontStyle: 'italic'
                                }}>
                                    Откроется, когда всё будет пройдено
                                </p>
                                <div style={{
                                    marginTop: 'var(--space-md)',
                                    color: 'var(--color-primary)',
                                    fontWeight: 600
                                }}>
                                    ✨ Теперь доступно!
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

import { motion } from 'framer-motion'
import { animations } from '../utils/animations'

export default function ActivityCard({
    icon,
    title,
    description,
    status, // 'available', 'locked', 'completed'
    onClick
}) {
    const isLocked = status === 'locked'
    const isCompleted = status === 'completed'

    const getStatusIcon = () => {
        if (isCompleted) return '✅'
        if (isLocked) return '🔒'
        return '🟢'
    }

    const getStatusText = () => {
        if (isCompleted) return 'Completed'
        if (isLocked) return 'Locked'
        return 'Available'
    }

    return (
        <motion.div
            {...animations.staggerItem}
            whileHover={!isLocked ? { scale: 1.03, y: -4 } : {}}
            whileTap={!isLocked ? { scale: 0.98 } : {}}
            onClick={!isLocked ? onClick : undefined}
            className="card glass"
            style={{
                padding: 'var(--space-lg)',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1,
                position: 'relative',
                border: isCompleted ? '2px solid var(--color-primary)' : 'none'
            }}
        >
            {/* Icon */}
            <div style={{
                fontSize: '3.5rem',
                marginBottom: 'var(--space-sm)',
                filter: isLocked ? 'grayscale(100%)' : 'none'
            }}>
                {icon}
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-xs)',
                fontFamily: 'var(--font-display)'
            }}>
                {title}
            </h3>

            {/* Description */}
            <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-light)',
                lineHeight: 1.4,
                marginBottom: 'var(--space-sm)',
                flexGrow: 1
            }}>
                {description}
            </p>

            {/* Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontSize: 'var(--text-sm)',
                color: isCompleted ? 'var(--color-primary)' : 'var(--color-text-light)',
                fontWeight: 500
            }}>
                <span>{getStatusIcon()}</span>
                <span>{getStatusText()}</span>
            </div>
        </motion.div>
    )
}

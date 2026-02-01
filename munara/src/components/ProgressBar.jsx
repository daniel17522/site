import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
    const percentage = (current / total) * 100

    return (
        <div className="progress-bar">
            <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </div>
    )
}

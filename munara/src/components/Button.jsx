import { motion } from 'framer-motion'
import { animations } from '../utils/animations'

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

    return (
        <motion.button
            className={`btn ${variantClass} ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...animations.slideUp}
            {...props}
        >
            {children}
        </motion.button>
    )
}

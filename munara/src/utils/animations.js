// Framer Motion animation presets

export const animations = {
    // Fade in from opacity 0 to 1
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.6 }
    },

    // Slide up from bottom
    slideUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
        transition: { duration: 0.5, ease: 'easeOut' }
    },

    // Scale and fade
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    },

    // Pulse animation
    pulse: {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    },

    // Float animation
    float: {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    },

    // Breathe animation
    breathe: {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    },

    // Stagger children
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    },

    // Stagger item
    staggerItem: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }
}

// Helper to create custom spring animation
export const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 20
}

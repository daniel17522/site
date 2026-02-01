import { motion } from 'framer-motion'
import { useMusic } from '../contexts/MusicContext'
import { useState } from 'react'

export default function MusicControl() {
    const { isPlaying, togglePlay, volume, changeVolume, currentTime, duration } = useMusic()
    const [showPanel, setShowPanel] = useState(false)

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 9999
            }}
            onMouseEnter={() => setShowPanel(true)}
            onMouseLeave={() => setShowPanel(false)}
        >
            {/* Control Panel */}
            <motion.div
                initial={false}
                animate={{
                    opacity: showPanel ? 1 : 0,
                    y: showPanel ? 0 : 20,
                    pointerEvents: showPanel ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '0',
                    background: 'linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 10px 40px rgba(255, 107, 157, 0.4)',
                    border: '3px solid #ff6b9d',
                    minWidth: '250px'
                }}
            >
                <h3 style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '1.2rem',
                    color: '#ff6b9d',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    🎵 Ordinary
                </h3>

                <p style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '0.9rem',
                    color: '#ffa6c1',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                }}>
                    Alex Warren
                </p>

                {/* Time display */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '0.8rem',
                    color: '#ff6b9d',
                    marginBottom: '0.5rem'
                }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Progress bar */}
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#ffb6d9',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}>
                    <motion.div
                        animate={{
                            width: duration ? `${(currentTime / duration) * 100}%` : '0%'
                        }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #ff6b9d, #ffd700)',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                {/* Volume control */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ fontSize: '1rem' }}>🔊</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        style={{
                            flex: 1,
                            accentColor: '#ff6b9d'
                        }}
                    />
                </div>
            </motion.div>

            {/* Floating Music Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                animate={{
                    boxShadow: isPlaying
                        ? [
                            '0 0 20px rgba(255, 107, 157, 0.6)',
                            '0 0 40px rgba(255, 215, 0, 0.8)',
                            '0 0 20px rgba(255, 107, 157, 0.6)'
                        ]
                        : '0 8px 20px rgba(255, 107, 157, 0.4)'
                }}
                transition={{
                    boxShadow: { duration: 2, repeat: Infinity }
                }}
                style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: isPlaying
                        ? 'linear-gradient(135deg, #ffd700, #ffeb3b)'
                        : 'linear-gradient(135deg, #ff6b9d, #ffa6c1)',
                    border: '4px solid white',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(255, 107, 157, 0.4)',
                    transition: 'background 0.3s ease'
                }}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </motion.button>

            {/* Pulsing rings when playing */}
            {isPlaying && (
                <>
                    <motion.div
                        animate={{
                            scale: [1, 1.6],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut'
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            border: '3px solid #ffd700',
                            pointerEvents: 'none'
                        }}
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.6],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: 0.5
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            border: '3px solid #ff6b9d',
                            pointerEvents: 'none'
                        }}
                    />
                </>
            )}
        </div>
    )
}

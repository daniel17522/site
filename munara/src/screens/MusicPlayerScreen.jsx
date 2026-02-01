import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

// Song list - реальные песни из public folder
const SONGS = [
    {
        id: 1,
        title: "Ordinary",
        artist: "Alex Warren",
        duration: "3:18",
        file: "/ordinary.mp3",
        mood: "romantic"
    },
    {
        id: 2,
        title: "The Night We Met",
        artist: "Lord Huron (feat. Phoebe Bridgers)",
        duration: "3:35",
        file: "/13_reasons_why_05. The Night We Met (feat. Phoebe Bridgers).mp3",
        mood: "emotional"
    },
    {
        id: 3,
        title: "Let Her Go",
        artist: "Passenger (Ed Sheeran Cover)",
        duration: "4:55",
        file: "/31-35_Gc_Ed_Sheeran_-_Let_Her_Go_RASK_L_V_-_a_(mp3.pm).mp3",
        mood: "sweet"
    }
]

const PHOTOS = [
    '/for_music_1.png',
    '/for_music_2.png',
    '/for_music_3.png',
    '/for_music_4.png',
    '/for_music_5.png',
    '/for_music_6.png',
    '/for_music_7.png',
    '/for_music_8.png'
]

export default function MusicPlayerScreen() {
    const navigate = useNavigate()
    const [currentSong, setCurrentSong] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [filmOffset, setFilmOffset] = useState(0)
    const [customSongs, setCustomSongs] = useState([])
    const fileInputRef = useRef(null)
    const audioRef = useRef(null)

    // Combine default songs with custom songs
    const allSongs = [...SONGS, ...customSongs]

    // Mark as completed when user enters
    useEffect(() => {
        completeCard(CARDS.MUSIC)
    }, [])

    // Create/update audio element when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause()
        }

        if (allSongs[currentSong]?.file) {
            audioRef.current = new Audio(allSongs[currentSong].file)
            audioRef.current.volume = 0.5

            // Auto-play if was playing
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error('Play failed:', err))
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }, [currentSong, allSongs])

    // Handle play/pause state
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.error('Play failed:', err)
                    setIsPlaying(false)
                })
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying])

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
        setCurrentSong((prev) => (prev + 1) % allSongs.length)
        setFilmOffset((prev) => (prev + 1) % PHOTOS.length)
    }

    const handlePrev = () => {
        setCurrentSong((prev) => (prev - 1 + allSongs.length) % allSongs.length)
        setFilmOffset((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)
    }

    const handleSongClick = (index) => {
        setCurrentSong(index)
        setIsPlaying(true)
        setFilmOffset(index % PHOTOS.length)
    }

    const handleAddSong = () => {
        fileInputRef.current?.click()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file)
            const audio = new Audio(url)

            audio.addEventListener('loadedmetadata', () => {
                const duration = Math.floor(audio.duration)
                const mins = Math.floor(duration / 60)
                const secs = duration % 60
                const durationStr = `${mins}:${secs.toString().padStart(2, '0')}`

                const newSong = {
                    id: Date.now(),
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    artist: 'Custom Upload',
                    duration: durationStr,
                    file: url,
                    mood: 'custom'
                }

                setCustomSongs(prev => [...prev, newSong])
            })
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa6c1 50%, #ffb6d9 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
        }}>
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.sin(i) * 50, 0],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3
                    }}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: 'clamp(1rem, 2vw, 2rem)',
                        opacity: 0.3
                    }}
                >
                    {['🎵', '🎶', '💕', '✨'][i % 4]}
                </motion.div>
            ))}

            {/* Back button */}
            <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/hub')}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '2rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '3px solid #ff6b9d',
                    borderRadius: '50px',
                    padding: '12px 25px',
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '1rem',
                    color: '#ff6b9d',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0px #c41e5a',
                    zIndex: 1000
                }}
            >
                ← Back
            </motion.button>

            {/* Main content */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '5rem'
            }}>
                {/* Left section - Retro Player & Vinyl */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Retro Music Player */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: 'linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%)',
                            borderRadius: '30px',
                            padding: '2rem',
                            boxShadow: '0 20px 60px rgba(196, 30, 90, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.5)',
                            border: '4px solid #ff6b9d',
                            position: 'relative'
                        }}
                    >
                        {/* Retro TV Screen */}
                        <div style={{
                            background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                            borderRadius: '20px',
                            padding: '2rem',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '3px solid #ff6b9d',
                            boxShadow: 'inset 0 0 30px rgba(255, 107, 157, 0.3)'
                        }}>
                            {/* CRT scanlines */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 157, 0.05) 2px, rgba(255, 107, 157, 0.05) 4px)',
                                pointerEvents: 'none',
                                zIndex: 10
                            }} />

                            {/* Screen glow */}
                            <motion.div
                                animate={{
                                    opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.2
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    inset: '-10px',
                                    background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Current song display */}
                            <div style={{
                                position: 'relative',
                                zIndex: 5,
                                textAlign: 'center'
                            }}>
                                <motion.h2
                                    key={currentSong}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        fontFamily: "'Pacifico', cursive",
                                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                        color: '#ffb6d9',
                                        marginBottom: '0.5rem',
                                        textShadow: '0 0 20px rgba(255, 182, 217, 0.8)'
                                    }}
                                >
                                    {allSongs[currentSong]?.title || 'No Song'}
                                </motion.h2>
                                <p style={{
                                    fontFamily: "'Pacifico', cursive",
                                    fontSize: '1.1rem',
                                    color: '#ffa6c1',
                                    marginBottom: '1rem'
                                }}>
                                    {allSongs[currentSong]?.artist || 'Unknown'}
                                </p>

                                {/* Waveform visualizer */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    height: '60px',
                                    marginTop: '1rem'
                                }}>
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={isPlaying ? {
                                                height: [
                                                    `${20 + Math.random() * 40}%`,
                                                    `${40 + Math.random() * 60}%`,
                                                    `${20 + Math.random() * 40}%`
                                                ]
                                            } : {}}
                                            transition={{
                                                duration: 0.5 + Math.random() * 0.5,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                            style={{
                                                width: '8px',
                                                height: isPlaying ? '40%' : '20%',
                                                background: 'linear-gradient(to top, #ff6b9d, #ffb6d9)',
                                                borderRadius: '4px',
                                                boxShadow: '0 0 10px rgba(255, 107, 157, 0.6)'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Control buttons */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            alignItems: 'center'
                        }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ff6b9d, #ffa6c1)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem',
                                    boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)'
                                }}
                            >
                                ⏮️
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayPause}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ffd700, #ffeb3b)',
                                    border: '4px solid #ff6b9d',
                                    cursor: 'pointer',
                                    fontSize: '2rem',
                                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {isPlaying ? '⏸️' : '▶️'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ff6b9d, #ffa6c1)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem',
                                    boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)'
                                }}
                            >
                                ⏭️
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Vinyl Player */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            background: 'linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%)',
                            borderRadius: '30px',
                            padding: '2rem',
                            boxShadow: '0 20px 60px rgba(196, 30, 90, 0.4)',
                            border: '4px solid #ff6b9d',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '300px'
                        }}
                    >
                        {/* Vinyl disc */}
                        <motion.div
                            animate={{
                                rotate: isPlaying ? 360 : 0
                            }}
                            transition={{
                                duration: 3,
                                repeat: isPlaying ? Infinity : 0,
                                ease: 'linear'
                            }}
                            style={{
                                width: 'clamp(200px, 40vw, 250px)',
                                height: 'clamp(200px, 40vw, 250px)',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #1a1a1a 0%, #1a1a1a 45%, #ff6b9d 45%, #ff6b9d 50%, #1a1a1a 50%, #1a1a1a 100%)',
                                position: 'relative',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 107, 157, 0.3)'
                            }}
                        >
                            {/* Center label */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '35%',
                                height: '35%',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ffd700, #ffeb3b)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                            }}>
                                💕
                            </div>

                            {/* Grooves */}
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: `${60 + i * 5}%`,
                                        height: `${60 + i * 5}%`,
                                        borderRadius: '50%',
                                        border: '1px solid rgba(255, 107, 157, 0.2)'
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Center section - Playlist */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        background: 'linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%)',
                        borderRadius: '30px',
                        padding: '2rem',
                        boxShadow: '0 20px 60px rgba(196, 30, 90, 0.4)',
                        border: '4px solid #ff6b9d'
                    }}
                >
                    <h2 style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        color: '#ff6b9d',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        textShadow: '3px 3px 0px #c41e5a'
                    }}>
                        Our Playlist 🎵
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />

                        {allSongs.map((song, index) => {
                            const isActive = index === currentSong
                            return (
                                <motion.div
                                    key={song.id}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSongClick(index)}
                                    style={{
                                        background: isActive
                                            ? 'linear-gradient(135deg, #ff6b9d, #ffa6c1)'
                                            : 'white',
                                        borderRadius: '20px',
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        border: `3px solid ${isActive ? '#ffd700' : '#ffb6d9'}`,
                                        boxShadow: isActive
                                            ? '0 8px 20px rgba(255, 215, 0, 0.4)'
                                            : '0 4px 10px rgba(255, 107, 157, 0.2)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div>
                                        <h3 style={{
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: '1.3rem',
                                            color: isActive ? 'white' : '#ff6b9d',
                                            marginBottom: '0.3rem'
                                        }}>
                                            {song.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: '0.9rem',
                                            color: isActive ? '#ffe6f0' : '#ffa6c1'
                                        }}>
                                            {song.artist}
                                        </p>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            fontFamily: "'Pacifico', cursive",
                                            color: isActive ? 'white' : '#ff6b9d',
                                            fontSize: '0.9rem'
                                        }}>
                                            {song.duration}
                                        </span>
                                        <span style={{ fontSize: '1.5rem' }}>
                                            {isActive && isPlaying ? '🎵' : '💕'}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Add Song Button */}
                        <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddSong}
                            style={{
                                background: 'linear-gradient(135deg, #ffd700, #ffeb3b)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                border: '3px dashed #ff6b9d',
                                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontFamily: "'Pacifico', cursive",
                                fontSize: '1.2rem',
                                color: '#ff6b9d',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>➕</span>
                            Add Your Song
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right section - Film Strip with Photos */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        background: 'linear-gradient(135deg, #fff4e6 0%, #ffe6f0 100%)',
                        borderRadius: '30px',
                        padding: '2rem',
                        boxShadow: '0 20px 60px rgba(196, 30, 90, 0.4)',
                        border: '4px solid #ff6b9d',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <h2 style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        color: '#ff6b9d',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        textShadow: '3px 3px 0px #c41e5a'
                    }}>
                        Memories 🎞️
                    </h2>

                    {/* Film strip */}
                    <div style={{
                        position: 'relative',
                        background: 'linear-gradient(135deg, #3a2a3a 0%, #2a1a2a 50%, #1a1a1a 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 30px rgba(255, 107, 157, 0.2)'
                    }}>
                        {/* Floating decorative elements to cover gaps */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={`float-${i}`}
                                animate={{
                                    y: [0, -30, 0],
                                    x: [0, Math.sin(i) * 15, 0],
                                    rotate: [0, 360],
                                    opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: 'easeInOut'
                                }}
                                style={{
                                    position: 'absolute',
                                    left: i % 2 === 0 ? '8%' : '85%',
                                    top: `${10 + (i * 8)}%`,
                                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                    zIndex: 5,
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.6))'
                                }}
                            >
                                {['💕', '✨', '🎵', '⭐', '💖', '🎶'][i % 6]}
                            </motion.div>
                        ))}

                        {/* Decorative gradient overlays on edges */}
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '50px',
                            background: 'linear-gradient(90deg, rgba(255, 107, 157, 0.15) 0%, transparent 100%)',
                            pointerEvents: 'none',
                            zIndex: 5
                        }} />
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '50px',
                            background: 'linear-gradient(270deg, rgba(255, 107, 157, 0.15) 0%, transparent 100%)',
                            pointerEvents: 'none',
                            zIndex: 5
                        }} />

                        {/* Film perforations - left */}
                        <div style={{
                            position: 'absolute',
                            left: '15px',
                            top: 0,
                            bottom: 0,
                            width: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            paddingTop: '15px',
                            zIndex: 10
                        }}>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        boxShadow: [
                                            '0 0 5px rgba(255, 107, 157, 0.5)',
                                            '0 0 10px rgba(255, 107, 157, 0.8)',
                                            '0 0 5px rgba(255, 107, 157, 0.5)'
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.05
                                    }}
                                    style={{
                                        width: '12px',
                                        height: '6px',
                                        background: 'linear-gradient(90deg, #ff6b9d, #ffa6c1)',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 5px rgba(255, 107, 157, 0.5)'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Film perforations - right */}
                        <div style={{
                            position: 'absolute',
                            right: '15px',
                            top: 0,
                            bottom: 0,
                            width: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            paddingTop: '15px',
                            zIndex: 10
                        }}>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        boxShadow: [
                                            '0 0 5px rgba(255, 107, 157, 0.5)',
                                            '0 0 10px rgba(255, 107, 157, 0.8)',
                                            '0 0 5px rgba(255, 107, 157, 0.5)'
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.05
                                    }}
                                    style={{
                                        width: '12px',
                                        height: '6px',
                                        background: 'linear-gradient(90deg, #ffa6c1, #ff6b9d)',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 5px rgba(255, 107, 157, 0.5)'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Photos */}
                        <motion.div
                            animate={{
                                y: -filmOffset * 200
                            }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                padding: '0 45px'
                            }}
                        >
                            {PHOTOS.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: index % 2 === 0 ? 2 : -2,
                                        zIndex: 20
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                    style={{
                                        position: 'relative',
                                        background: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Photo number badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '-10px',
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #ffd700, #ffeb3b)',
                                            border: '3px solid #ff6b9d',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                            color: '#ff6b9d',
                                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.6)',
                                            zIndex: 30
                                        }}
                                    >
                                        {index + 1}
                                    </motion.div>

                                    {/* Image container */}
                                    <div style={{
                                        position: 'relative',
                                        height: '200px',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        background: '#000'
                                    }}>
                                        <img
                                            src={photo}
                                            alt={`Memory ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />

                                        {/* Vintage film grain overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 157, 0.02) 2px, rgba(255, 107, 157, 0.02) 4px)',
                                            pointerEvents: 'none'
                                        }} />

                                        {/* Glowing border overlay on hover */}
                                        <motion.div
                                            whileHover={{
                                                opacity: 1
                                            }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                border: '3px solid transparent',
                                                borderRadius: '4px',
                                                background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.3), rgba(255, 215, 0, 0.3))',
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                transition: 'opacity 0.3s ease'
                                            }}
                                        />
                                    </div>

                                    {/* Polaroid caption area */}
                                    <div style={{
                                        marginTop: '8px',
                                        textAlign: 'center'
                                    }}>
                                        <p style={{
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: '0.85rem',
                                            color: '#ff6b9d',
                                            margin: 0
                                        }}>
                                            Memory #{index + 1}
                                        </p>
                                    </div>

                                    {/* Corner decorations */}
                                    {[0, 1, 2, 3].map((corner) => (
                                        <div
                                            key={corner}
                                            style={{
                                                position: 'absolute',
                                                width: '6px',
                                                height: '6px',
                                                background: '#ff6b9d',
                                                borderRadius: '50%',
                                                boxShadow: '0 0 4px rgba(255, 107, 157, 0.8)',
                                                ...(corner === 0 && { top: '8px', left: '8px' }),
                                                ...(corner === 1 && { top: '8px', right: '8px' }),
                                                ...(corner === 2 && { bottom: '8px', left: '8px' }),
                                                ...(corner === 3 && { bottom: '8px', right: '8px' })
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Headphones decoration */}
                    <motion.div
                        animate={{
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            bottom: '2rem',
                            right: '2rem',
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            filter: 'drop-shadow(0 4px 10px rgba(255, 107, 157, 0.4))'
                        }}
                    >
                        🎧
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

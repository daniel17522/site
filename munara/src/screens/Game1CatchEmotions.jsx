import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

const COLORS = [
    { id: 1, color: '#ff6b9d', x: 25, y: 30, word: 'радость' },
    { id: 2, color: '#ffb6c1', x: 70, y: 35, word: 'грусть' },
    { id: 3, color: '#ff9ec5', x: 40, y: 60, word: 'тепло' },
    { id: 4, color: '#ffc9d6', x: 60, y: 65, word: 'покой' },
    { id: 5, color: '#ffe6f0', x: 50, y: 45, word: 'волнение' }
]

const CONNECTIONS_NEEDED = 3

export default function Game1CatchEmotions() {
    const navigate = useNavigate()
    const canvasRef = useRef(null)
    const [connections, setConnections] = useState(0)
    const [showWord, setShowWord] = useState(null)
    const [connectedPairs, setConnectedPairs] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)
    const [startBlob, setStartBlob] = useState(null)
    const [showEnding, setShowEnding] = useState(false)

    const timeRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        let animationFrameId

        const render = (time) => {
            timeRef.current = time * 0.001
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections first
            connectedPairs.forEach(pair => {
                const blob1 = COLORS.find(c => c.id === pair.from)
                const blob2 = COLORS.find(c => c.id === pair.to)

                if (blob1 && blob2) {
                    const x1 = (blob1.x / 100) * canvas.width
                    const y1 = (blob1.y / 100) * canvas.height
                    const x2 = (blob2.x / 100) * canvas.width
                    const y2 = (blob2.y / 100) * canvas.height

                    ctx.strokeStyle = 'rgba(255, 107, 157, 0.4)'
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.stroke()
                }
            })

            // Draw blobs
            COLORS.forEach((blob, index) => {
                const x = (blob.x / 100) * canvas.width
                const y = (blob.y / 100) * canvas.height

                const wobbleX = Math.sin(timeRef.current + index) * 3
                const wobbleY = Math.cos(timeRef.current + index * 1.5) * 3
                const breathe = 1 + Math.sin(timeRef.current * 0.5 + index) * 0.05

                const gradient = ctx.createRadialGradient(x + wobbleX, y + wobbleY, 0, x + wobbleX, y + wobbleY, 50 * breathe)
                gradient.addColorStop(0, blob.color)
                gradient.addColorStop(0.6, blob.color)
                gradient.addColorStop(1, 'rgba(255,255,255,0)')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(x + wobbleX, y + wobbleY, 50 * breathe, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = 'rgba(255,255,255,0.3)'
                ctx.beginPath()
                ctx.arc(x + wobbleX, y + wobbleY, 20 * breathe, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render(0)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [connectedPairs])

    const getBlobAtPosition = (x, y) => {
        const canvas = canvasRef.current
        if (!canvas) return null

        for (const blob of COLORS) {
            const blobX = (blob.x / 100) * canvas.width
            const blobY = (blob.y / 100) * canvas.height
            const distance = Math.sqrt((x - blobX) ** 2 + (y - blobY) ** 2)

            if (distance < 50) {
                return blob
            }
        }
        return null
    }

    const handleCanvasMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const blob = getBlobAtPosition(x, y)
        if (blob) {
            setIsDrawing(true)
            setStartBlob(blob)
        }
    }

    const handleCanvasMouseUp = (e) => {
        if (!isDrawing || !startBlob) return

        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const endBlob = getBlobAtPosition(x, y)

        if (endBlob && endBlob.id !== startBlob.id) {
            const alreadyConnected = connectedPairs.some(
                pair =>
                    (pair.from === startBlob.id && pair.to === endBlob.id) ||
                    (pair.from === endBlob.id && pair.to === startBlob.id)
            )

            if (!alreadyConnected) {
                setConnectedPairs(prev => [...prev, { from: startBlob.id, to: endBlob.id }])

                const wordToShow = Math.random() > 0.5 ? startBlob.word : endBlob.word
                setShowWord(wordToShow)
                setTimeout(() => setShowWord(null), 2000)

                const newCount = connections + 1
                setConnections(newCount)

                if (newCount >= CONNECTIONS_NEEDED) {
                    setTimeout(() => {
                        setShowEnding(true)
                    }, 2000)
                }
            }
        }

        setIsDrawing(false)
        setStartBlob(null)
    }

    const handleContinue = () => {
        completeCard(CARDS.EMOTIONS)
        window.location.href = '/hub'
    }

    if (showEnding) {
        return (
            <div
                className="screen"
                style={{
                    background: '#0a0a0a',
                    position: 'relative'
                }}
            >
                {/* Pink glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }} />

                <div className="screen-content text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <h2
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: '#ffb6c1',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                                marginBottom: '3rem'
                            }}
                        >
                            Эмоции не нужно удерживать.{'\n'}Их нужно проживать.
                        </h2>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 107, 157, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContinue}
                            style={{
                                background: 'linear-gradient(135deg, #ff6b9d 0%, #ff9ec5 100%)',
                                border: 'none',
                                borderRadius: '50px',
                                color: 'white',
                                padding: '15px 40px',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-primary)',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(255, 107, 157, 0.3)'
                            }}
                        >
                            Дальше
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="screen"
            style={{
                background: '#0a0a0a',
                position: 'relative'
            }}
        >
            {/* Guide text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2 }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 10,
                    pointerEvents: 'none'
                }}
            >
                <p
                    style={{
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        color: '#ffb6c1',
                        letterSpacing: '0.1em'
                    }}
                >
                    соедини цвета
                </p>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 182, 193, 0.5)',
                    marginTop: '0.5rem'
                }}>
                    {connections} / {CONNECTIONS_NEEDED}
                </p>
            </motion.div>

            <canvas
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseUp={handleCanvasMouseUp}
                onTouchStart={(e) => {
                    const touch = e.touches[0]
                    const mouseEvent = new MouseEvent('mousedown', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    })
                    handleCanvasMouseDown(mouseEvent)
                }}
                onTouchEnd={(e) => {
                    const touch = e.changedTouches[0]
                    const mouseEvent = new MouseEvent('mouseup', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    })
                    handleCanvasMouseUp(mouseEvent)
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    cursor: isDrawing ? 'grabbing' : 'crosshair',
                    touchAction: 'none'
                }}
            />

            <AnimatePresence>
                {showWord && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(5px)', transition: { duration: 1 } }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            color: '#ffb6c1',
                            pointerEvents: 'none',
                            zIndex: 100,
                            letterSpacing: '0.1em',
                            textShadow: '0 0 30px rgba(255, 107, 157, 0.6)'
                        }}
                    >
                        {showWord}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

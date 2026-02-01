import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animations } from '../utils/animations'
import Button from '../components/Button'

const GRID_SIZE = 3
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE

// Generate initial shuffled puzzle
const generatePuzzle = () => {
    const pieces = Array.from({ length: TOTAL_PIECES }, (_, i) => i)
    // Shuffle array
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]]
    }
    return pieces
}

export default function Game3Puzzle() {
    const navigate = useNavigate()
    const [pieces, setPieces] = useState(generatePuzzle())
    const [selectedPiece, setSelectedPiece] = useState(null)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        // Check if puzzle is solved
        const isSolved = pieces.every((piece, index) => piece === index)
        if (isSolved && !completed) {
            setTimeout(() => setCompleted(true), 500)
        }
    }, [pieces, completed])

    const handlePieceClick = (index) => {
        if (completed) return

        if (selectedPiece === null) {
            setSelectedPiece(index)
        } else {
            // Swap pieces
            const newPieces = [...pieces]
                ;[newPieces[selectedPiece], newPieces[index]] = [newPieces[index], newPieces[selectedPiece]]
            setPieces(newPieces)
            setSelectedPiece(null)
        }
    }

    const handleContinue = () => {
        navigate('/game4')
    }

    // Gradient colors for puzzle pieces
    const getGradient = (pieceNum) => {
        const hue1 = 320 + (pieceNum * 5)
        const hue2 = 260 + (pieceNum * 5)
        return `linear-gradient(135deg, hsl(${hue1}, 70%, 85%) 0%, hsl(${hue2}, 70%, 85%) 100%)`
    }

    return (
        <div className="screen" style={{ background: 'linear-gradient(135deg, #fff5f9 0%, #e6f0ff 100%)' }}>
            <div className="screen-content">
                {!completed ? (
                    <>
                        <motion.div
                            {...animations.slideUp}
                            className="text-center"
                            style={{ marginBottom: 'var(--space-lg)' }}
                        >
                            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
                                Собери момент 🧩
                            </h2>
                            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-light)' }}>
                                Нажми на две плитки, чтобы поменять их местами
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                                gap: '8px',
                                maxWidth: '320px',
                                margin: '0 auto',
                                padding: 'var(--space-md)',
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            {pieces.map((pieceNum, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => handlePieceClick(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        aspectRatio: '1',
                                        background: getGradient(pieceNum),
                                        borderRadius: 'var(--radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'var(--text-2xl)',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        cursor: 'pointer',
                                        border: selectedPiece === index ? '3px solid var(--color-primary)' : '2px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: selectedPiece === index ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                                        userSelect: 'none'
                                    }}
                                >
                                    {pieceNum + 1}
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        {...animations.scaleIn}
                        className="text-center"
                    >
                        {/* Animated scene */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            style={{
                                fontSize: '6rem',
                                marginBottom: 'var(--space-lg)'
                            }}
                        >
                            💖
                        </motion.div>

                        {/* Success message */}
                        <h2 style={{
                            fontSize: 'var(--text-3xl)',
                            marginBottom: 'var(--space-md)',
                            color: 'var(--color-text)'
                        }}>
                            Прекрасно!
                        </h2>

                        <motion.p
                            {...animations.fadeIn}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'var(--text-xl)',
                                color: 'var(--color-text-light)',
                                fontStyle: 'italic',
                                marginBottom: 'var(--space-xl)',
                                maxWidth: '300px',
                                margin: '0 auto var(--space-xl)'
                            }}
                        >
                            «Иногда достаточно собрать всё по кусочкам»
                        </motion.p>

                        <Button onClick={handleContinue}>
                            Продолжить 🌸
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

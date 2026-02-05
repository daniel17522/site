import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeCard, CARDS } from '../utils/progress'

export default function PuzzleLiliesScreen() {
    const navigate = useNavigate()
    const [pieces, setPieces] = useState([])
    const [draggedPiece, setDraggedPiece] = useState(null)
    const [completedPieces, setCompletedPieces] = useState([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [hintVisible, setHintVisible] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState(null) // For touch support

    const GRID_SIZE = 3 // 3x3 puzzle
    const PIECE_SIZE = 120

    useEffect(() => {
        // Initialize puzzle pieces
        const initialPieces = []
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                initialPieces.push({
                    id: row * GRID_SIZE + col,
                    correctRow: row,
                    correctCol: col,
                    currentRow: null,
                    currentCol: null
                })
            }
        }

        // Shuffle pieces
        const shuffled = initialPieces
            .map(piece => ({ ...piece, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)

        setPieces(shuffled)
    }, [])

    const handleDragStart = (piece) => {
        setDraggedPiece(piece)
    }

    const handleDrop = (row, col) => {
        if (!draggedPiece) return

        // Check if spot is already taken
        const spotTaken = pieces.some(p => p.currentRow === row && p.currentCol === col)
        if (spotTaken) return

        // Place piece
        const newPieces = pieces.map(p => {
            if (p.id === draggedPiece.id) {
                return { ...p, currentRow: row, currentCol: col }
            }
            return p
        })

        setPieces(newPieces)
        setDraggedPiece(null)

        // Check if piece is correct
        if (draggedPiece.correctRow === row && draggedPiece.correctCol === col) {
            setCompletedPieces(prev => [...prev, draggedPiece.id])
        }

        // Check if puzzle is complete
        const allCorrect = newPieces.every(p =>
            p.currentRow === p.correctRow && p.currentCol === p.correctCol
        )

        if (allCorrect) {
            setShowSuccess(true)
            setTimeout(() => {
                completeCard(CARDS.PUZZLE)
                window.location.href = '/hub'
            }, 3000)
        }
    }

    // Touch-friendly: Click to select, click to place
    const handlePieceClick = (piece) => {
        setSelectedPiece(piece)
    }

    const handleSlotClick = (row, col) => {
        if (!selectedPiece) return

        // Check if spot is already taken
        const spotTaken = pieces.some(p => p.currentRow === row && p.currentCol === col && p.id !== selectedPiece.id)
        if (spotTaken) return

        // Place piece
        const newPieces = pieces.map(p => {
            if (p.id === selectedPiece.id) {
                return { ...p, currentRow: row, currentCol: col }
            }
            return p
        })

        setPieces(newPieces)
        setSelectedPiece(null)

        // Check if piece is correct
        if (selectedPiece.correctRow === row && selectedPiece.correctCol === col) {
            setCompletedPieces(prev => [...prev, selectedPiece.id])
        }

        // Check if puzzle is complete
        const allCorrect = newPieces.every(p =>
            p.currentRow === p.correctRow && p.currentCol === p.correctCol
        )

        if (allCorrect) {
            setShowSuccess(true)
            setTimeout(() => {
                completeCard(CARDS.PUZZLE)
                window.location.href = '/hub'
            }, 3000)
        }
    }

    const getPieceStyle = (piece) => {
        const isSelected = selectedPiece?.id === piece.id
        return {
            backgroundImage: 'url(/lily-bouquet.png)',
            backgroundSize: `${PIECE_SIZE * GRID_SIZE}px ${PIECE_SIZE * GRID_SIZE}px`,
            backgroundPosition: `-${piece.correctCol * PIECE_SIZE}px -${piece.correctRow * PIECE_SIZE}px`,
            width: `${PIECE_SIZE}px`,
            height: `${PIECE_SIZE}px`,
            border: isSelected
                ? '3px solid #3b82f6'
                : completedPieces.includes(piece.id)
                    ? '3px solid #4ade80'
                    : '3px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: isSelected
                ? '0 0 20px rgba(59, 130, 246, 0.8)'
                : completedPieces.includes(piece.id)
                    ? '0 0 20px rgba(74, 222, 128, 0.5)'
                    : '0 4px 15px rgba(0, 0, 0, 0.2)'
        }
    }

    const unplacedPieces = pieces.filter(p => p.currentRow === null)
    const placedPieces = pieces.filter(p => p.currentRow !== null)

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
            {/* Background decorations */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                    style={{
                        position: 'absolute',
                        left: `${10 + i * 12}%`,
                        top: `${15 + (i % 3) * 30}%`,
                        fontSize: '2rem',
                        pointerEvents: 'none',
                        opacity: 0.4
                    }}
                >
                    🌸
                </motion.div>
            ))}

            {/* Success celebration */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 107, 138, 0.95)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, x: 0, y: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    x: Math.cos((i / 20) * Math.PI * 2) * 200,
                                    y: Math.sin((i / 20) * Math.PI * 2) * 200,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    fontSize: '2.5rem'
                                }}
                            >
                                🌸
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>
                                💐
                            </div>
                            <h2 style={{
                                fontSize: '3rem',
                                fontFamily: "'Pacifico', cursive",
                                color: 'white',
                                marginBottom: '0.5rem',
                                textShadow: '3px 3px 0px rgba(255, 77, 122, 0.6)'
                            }}>
                                Прекрасно!
                            </h2>
                            <p style={{
                                fontSize: '1.5rem',
                                fontFamily: "'Pacifico', cursive",
                                color: 'white',
                                textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)'
                            }}>
                                Букет собран! 🌸
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontFamily: "'Pacifico', cursive",
                    color: 'white',
                    textShadow: '3px 3px 0px #ff4d7a, -2px -2px 0px #ff8fa8',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}
            >
                Собери Букет Лилий 💐
            </motion.h1>

            <p style={{
                fontFamily: "'Pacifico', cursive",
                color: 'white',
                fontSize: '1rem',
                marginBottom: '2rem',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(255, 77, 122, 0.4)'
            }}>
                Перетащи или нажми на кусочки, затем нажми на место
            </p>

            {/* Hint button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHintVisible(!hintVisible)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'white',
                    border: '3px solid #ff4d7a',
                    borderRadius: '50px',
                    padding: '10px 20px',
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '1rem',
                    color: '#ff4d7a',
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0px #ff4d7a',
                    zIndex: 10
                }}
            >
                {hintVisible ? 'Скрыть 👁️' : 'Подсказка 💡'}
            </motion.button>

            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Puzzle Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        background: hintVisible ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '4px solid white',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 4px 4px 0px rgba(255, 77, 122, 0.3)'
                    }}
                >
                    {/* Hint overlay */}
                    {hintVisible && (
                        <div style={{
                            position: 'absolute',
                            width: `${PIECE_SIZE * GRID_SIZE}px`,
                            height: `${PIECE_SIZE * GRID_SIZE}px`,
                            backgroundImage: 'url(/lily-bouquet.png)',
                            backgroundSize: 'cover',
                            opacity: 0.3,
                            borderRadius: '12px',
                            pointerEvents: 'none'
                        }} />
                    )}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIECE_SIZE}px)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, ${PIECE_SIZE}px)`,
                        gap: '8px',
                        position: 'relative'
                    }}>
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                            const row = Math.floor(idx / GRID_SIZE)
                            const col = idx % GRID_SIZE
                            const placedPiece = placedPieces.find(p => p.currentRow === row && p.currentCol === col)

                            return (
                                <div
                                    key={idx}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(row, col)}
                                    onClick={() => handleSlotClick(row, col)}
                                    style={{
                                        width: `${PIECE_SIZE}px`,
                                        height: `${PIECE_SIZE}px`,
                                        background: placedPiece ? 'transparent' : 'rgba(255, 255, 255, 0.2)',
                                        border: '3px dashed rgba(255, 255, 255, 0.4)',
                                        borderRadius: '12px',
                                        position: 'relative',
                                        cursor: selectedPiece ? 'pointer' : 'default'
                                    }}
                                >
                                    {placedPiece && (
                                        <div
                                            draggable
                                            onDragStart={() => handleDragStart(placedPiece)}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePieceClick(placedPiece)
                                            }}
                                            style={getPieceStyle(placedPiece)}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Unplaced Pieces */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '4px solid white',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 4px 4px 0px rgba(255, 77, 122, 0.3)',
                        maxWidth: '400px'
                    }}
                >
                    <h3 style={{
                        fontFamily: "'Pacifico', cursive",
                        color: 'white',
                        fontSize: '1.2rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)'
                    }}>
                        Кусочки ({unplacedPieces.length})
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '12px'
                    }}>
                        {unplacedPieces.map((piece) => (
                            <motion.div
                                key={piece.id}
                                draggable
                                onDragStart={() => handleDragStart(piece)}
                                onClick={() => handlePieceClick(piece)}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                style={getPieceStyle(piece)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Progress */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                    marginTop: '2rem',
                    fontFamily: "'Pacifico', cursive",
                    fontSize: '1.2rem',
                    color: 'white',
                    textShadow: '2px 2px 0px rgba(255, 77, 122, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <span>Собрано:</span>
                {completedPieces.length} / {GRID_SIZE * GRID_SIZE}
                <span style={{ fontSize: '1.5rem' }}>
                    {completedPieces.length === GRID_SIZE * GRID_SIZE ? '🎉' : '🌸'}
                </span>
            </motion.div>
        </div>
    )
}

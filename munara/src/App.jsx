import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { hasAnsweredValentine } from './utils/progress'
import { MusicProvider } from './contexts/MusicContext'
import MusicControl from './components/MusicControl'

// Screens
import ValentineQuestionScreen from './screens/ValentineQuestionScreen'
import HubInteractiveSpace from './screens/HubInteractiveSpace'
import FinalLetterScreen from './screens/FinalLetterScreen'
import PuzzleLiliesScreen from './screens/PuzzleLiliesScreen'
import PragueTravelScreen from './screens/PragueTravelScreen'
import ConstellationGameScreen from './screens/ConstellationGameScreen'
import MagicEightBall from './screens/MagicEightBall'
import UpsideDownGallery from './screens/UpsideDownGallery'
import MusicPlayerScreen from './screens/MusicPlayerScreen'

function App() {
    // Check if user has answered Valentine question
    const answered = hasAnsweredValentine()

    return (
        <MusicProvider>
            <Router>
                <AnimatePresence mode="wait">
                    <Routes>
                        {/* Entrance - Valentine Question */}
                        <Route path="/" element={<ValentineQuestionScreen />} />

                        {/* Hub Menu */}
                        <Route
                            path="/hub"
                            element={answered ? <HubInteractiveSpace /> : <Navigate to="/" />}
                        />

                        {/* Activities */}
                        <Route
                            path="/activity/puzzle"
                            element={answered ? <PuzzleLiliesScreen /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/activity/prague"
                            element={answered ? <PragueTravelScreen /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/activity/constellation"
                            element={answered ? <ConstellationGameScreen /> : <Navigate to="/" />}
                        />

                        {/* Mystical Features */}
                        <Route
                            path="/magic-ball"
                            element={answered ? <MagicEightBall /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/upside-down"
                            element={answered ? <UpsideDownGallery /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/music"
                            element={answered ? <MusicPlayerScreen /> : <Navigate to="/" />}
                        />

                        {/* Final Letter */}
                        <Route
                            path="/letter"
                            element={answered ? <FinalLetterScreen /> : <Navigate to="/" />}
                        />

                        {/* Redirect any unknown routes to entrance */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </AnimatePresence>

                {/* Global Music Control */}
                {answered && <MusicControl />}
            </Router>
        </MusicProvider>
    )
}

export default App

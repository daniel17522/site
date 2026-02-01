// Progress tracking for activities

const CARDS = {
    PUZZLE: 'puzzle',
    PRAGUE: 'prague',
    CONSTELLATION: 'constellation',
    MUSIC: 'music',
    MAGIC_BALL: 'magic-ball',
    UPSIDE_DOWN: 'upside-down'
}

const CARD_ORDER = [
    CARDS.PUZZLE,
    CARDS.PRAGUE,
    CARDS.CONSTELLATION,
    CARDS.MUSIC,
    CARDS.MAGIC_BALL,
    CARDS.UPSIDE_DOWN
]

const STORAGE_KEYS = {
    PROGRESS: 'munara_progress',
    VALENTINE_ANSWERED: 'valentine_answered',
    USER_CHOICE: 'user_choice' // This key was introduced in the provided edit, but not used in the context of this file. Keeping it as per the edit.
}

// Get progress object from localStorage
export const getProgress = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    if (saved) {
        try {
            const savedProgress = JSON.parse(saved)
            const emptyProgress = createEmptyProgress()

            // Merge saved progress with empty structure to ensure all new fields exist
            return {
                ...emptyProgress,
                ...savedProgress,
                cards: {
                    ...emptyProgress.cards,
                    ...savedProgress.cards
                }
            }
        } catch (e) {
            return createEmptyProgress()
        }
    }
    return createEmptyProgress()
}

// Create empty progress structure
const createEmptyProgress = () => ({
    valentineAnswered: false,
    cards: {
        [CARDS.PUZZLE]: false,
        [CARDS.PRAGUE]: false,
        [CARDS.CONSTELLATION]: false,
        [CARDS.MUSIC]: false,
        [CARDS.MAGIC_BALL]: false,
        [CARDS.UPSIDE_DOWN]: false
    }
})

// Save progress to localStorage
export const saveProgress = (progress) => {
    localStorage.setItem('munara_progress', JSON.stringify(progress))
}

// Mark Valentine question as answered
export const answerValentineQuestion = () => {
    const progress = getProgress()
    progress.valentineAnswered = true
    saveProgress(progress)
}

// Check if Valentine question was answered
export const hasAnsweredValentine = () => {
    return getProgress().valentineAnswered
}

// Mark a card as complete
export const completeCard = (cardId) => {
    const progress = getProgress()
    if (progress.cards.hasOwnProperty(cardId)) {
        progress.cards[cardId] = true
        saveProgress(progress)
    }
}

// Check if a card is completed
export const isCardCompleted = (cardId) => {
    return getProgress().cards[cardId] || false
}

// Get the next unlocked card
export const getNextUnlockedCard = () => {
    const progress = getProgress()

    // First card is always unlocked
    if (!progress.cards[CARDS.EMOTIONS]) {
        return CARDS.EMOTIONS
    }

    // Find first incomplete card
    for (let i = 0; i < CARD_ORDER.length; i++) {
        const cardId = CARD_ORDER[i]
        if (!progress.cards[cardId]) {
            return cardId
        }
    }

    return null // All cards completed
}

// Check if a card is unlocked (available to play)
export const isCardUnlocked = (cardId) => {
    const progress = getProgress()
    const cardIndex = CARD_ORDER.indexOf(cardId)

    if (cardIndex === -1) return false
    if (cardIndex === 0) return true // First card always unlocked

    // Check if previous card is completed
    const previousCard = CARD_ORDER[cardIndex - 1]
    return progress.cards[previousCard] === true
}

// Check if all cards are completed
export const areAllCardsCompleted = () => {
    const progress = getProgress()
    return CARD_ORDER.every(cardId => progress.cards[cardId] === true)
}

// Reset all progress
export const resetProgress = () => {
    saveProgress(createEmptyProgress())
}

// Get completion percentage
export const getCompletionPercentage = () => {
    const progress = getProgress()
    const completed = CARD_ORDER.filter(cardId => progress.cards[cardId]).length
    return Math.round((completed / CARD_ORDER.length) * 100)
}

export { CARDS, CARD_ORDER }

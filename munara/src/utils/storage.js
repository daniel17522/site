// LocalStorage helper functions for progress tracking

const STORAGE_KEYS = {
    CURRENT_SCREEN: 'munara_current_screen',
    COMPLETED_SCREENS: 'munara_completed_screens',
    USER_CHOICE: 'munara_user_choice',
    FIRST_VISIT: 'munara_first_visit'
}

export const storage = {
    // Get current screen index
    getCurrentScreen: () => {
        const screen = localStorage.getItem(STORAGE_KEYS.CURRENT_SCREEN)
        return screen ? parseInt(screen, 10) : 0
    },

    // Set current screen index
    setCurrentScreen: (screenIndex) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SCREEN, screenIndex.toString())
    },

    // Mark screen as completed
    completeScreen: (screenIndex) => {
        const completed = storage.getCompletedScreens()
        if (!completed.includes(screenIndex)) {
            completed.push(screenIndex)
            localStorage.setItem(STORAGE_KEYS.COMPLETED_SCREENS, JSON.stringify(completed))
        }
    },

    // Get all completed screens
    getCompletedScreens: () => {
        const completed = localStorage.getItem(STORAGE_KEYS.COMPLETED_SCREENS)
        return completed ? JSON.parse(completed) : []
    },

    // Save user's choice from interactive screen
    setUserChoice: (choice) => {
        localStorage.setItem(STORAGE_KEYS.USER_CHOICE, choice)
    },

    // Get user's choice
    getUserChoice: () => {
        return localStorage.getItem(STORAGE_KEYS.USER_CHOICE) || 'Улыбка'
    },

    // Check if first visit
    isFirstVisit: () => {
        const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT)
        if (!firstVisit) {
            localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, 'false')
            return true
        }
        return false
    },

    // Reset all progress
    resetProgress: () => {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key)
        })
    }
}

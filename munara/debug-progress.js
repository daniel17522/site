// Debug script to check completion status
console.log('=== MUNARA PROGRESS DEBUG ===');

const progress = localStorage.getItem('munara_progress');
console.log('Raw progress:', progress);

if (progress) {
    const parsed = JSON.parse(progress);
    console.log('Parsed progress:', parsed);
    console.log('Cards:', parsed.cards);
    console.log('Constellation completed?', parsed.cards?.constellation);
}

// List all cards that should be completed
const CARD_ORDER = ['puzzle', 'prague', 'constellation'];
console.log('\nCard completion status:');
CARD_ORDER.forEach(card => {
    const completed = parsed?.cards?.[card];
    console.log(`  ${card}: ${completed ? '✅' : '❌'}`);
});

// Check if all completed
const allCompleted = CARD_ORDER.every(cardId => parsed?.cards?.[cardId] === true);
console.log('\nAll cards completed?', allCompleted);
console.log('Final envelope should show?', allCompleted);

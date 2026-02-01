// Classic Magic 8-Ball predictions
export const PREDICTIONS = [
    // Affirmative Answers (Positive)
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",

    // Non-Committal Answers (Neutral)
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",

    // Negative Answers (Negative)
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
]

export const getRandomPrediction = (previousPrediction = null) => {
    let prediction
    do {
        prediction = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)]
    } while (prediction === previousPrediction && PREDICTIONS.length > 1)

    return prediction
}

export const TEST_HABITS = [
    {
        id: "1",
        title: "Drink 8 glasses of water",
        difficulty: "easy",
        discipline: "Body",
        completed: true,
        streak: 5,
        xpReward: 10,
        lastCompleted: Date.now(),
    },
    {
        id: "2",
        title: "Exercise for 30 minutes",
        difficulty: "medium",
        discipline: "Body",
        completed: false,
        streak: 3,
        xpReward: 25,
        lastCompleted: null,
    },
    {
        id: "3",
        title: "Read for 1 hour",
        difficulty: "hard",
        discipline: "Intellect",
        completed: false,
        streak: 7,
        xpReward: 50,
        lastCompleted: null,
    },
    {
        id: "4",
        title: "Meditate for 10 minutes",
        difficulty: "easy",
        discipline: "Clarity",
        completed: true,
        streak: 2,
        xpReward: 10,
        lastCompleted: Date.now(),
    },
];

export const HABIT_DISCIPLINES = [
    {
        value: "clarity",
        label: "Clarity",
    },
    {
        value: "intellect",
        label: "Intellect",
    },
    {
        value: "body",
        label: "Body",
    },
    {
        value: "creativity",
        label: "Creativity",
    },
    {
        value: "expression",
        label: "Expression",
    },
];

export const DIFFICULTIES_REWARD = {
    easy: 10,
    medium: 25,
    hard: 50,
};

export const DIFFICULTY_ORDER = {
    hard: 1,
    medium: 2,
    easy: 3,
};

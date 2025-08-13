import { FireSimpleIcon } from "@phosphor-icons/react";

import { useTheme } from "../hooks/useTheme";
import { getThemeHex } from "../constants/themes";
import Button from "./Button";
import CompleteButton from "./CompleteButton";
import { useState } from "react";
import { DIFFICULTIES_REWARD } from "../constants/habits";

export default function HabitCard({
    id,
    title,
    difficulty,
    discipline,
    streak,
    completed,
    onComplete,
}) {
    const { theme } = useTheme();

    const [isAnimating, setIsAnimating] = useState(false);

    const xpReward = DIFFICULTIES_REWARD[difficulty];

    const handleComplete = () => {
        if (!completed) {
            setIsAnimating(true);
            onComplete(id);
            setTimeout(() => setIsAnimating(false), 1100);
        }
    };

    return (
        <div
            className={`relative rounded-2xl p-4 overflow-hidden border border-primary-300 shadow-md transition-transform hover:scale-105`}
        >
            {/* Background Animation */}
            <div
                className={`absolute inset-0 bg-gradient-primary transition-transform duration-1000 ${
                    completed || isAnimating
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            ></div>

            {/* XP Float Animation */}
            {isAnimating && (
                <div className="absolute top-4 right-4 pointer-events-none z-20">
                    <div className="text-yellow-300 font-bold animate-bounce">
                        +{xpReward} XP
                    </div>
                </div>
            )}

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between uppercase text-xs text-center font-semibold">
                    <span
                        className={`p-2 w-25 rounded-md ${
                            completed
                                ? "hidden"
                                : "text-text-300 bg-gradient-primary"
                        }`}
                    >
                        {discipline}
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <h2
                            className={`text-lg font-bold  ${
                                completed
                                    ? "text-background-300"
                                    : "text-text-300"
                            }`}
                        >
                            {title}
                        </h2>
                        {streak > 0 && (
                            <div
                                className={`flex items-center space-x-1 text-sm font-semibold ${
                                    completed
                                        ? "text-accent-300"
                                        : "gradient-text-primary"
                                }`}
                            >
                                <FireSimpleIcon
                                    size={24}
                                    weight="fill"
                                    color={getThemeHex(theme, "primary")}
                                />
                                <span>{streak}-day streak</span>
                            </div>
                        )}
                    </div>

                    {/* Button */}
                    <CompleteButton
                        size={40}
                        completed={completed}
                        onComplete={handleComplete}
                    />
                </div>
            </div>
        </div>
    );
}

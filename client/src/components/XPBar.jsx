import { TEST_USER_DATA } from "../constants/user";

export default function XPBar({ xpData }) {
    if (!xpData) return null;

    const { level, currentXP, toNextLevel, progressPercent } = xpData;
    const maxXP = currentXP + toNextLevel;

    return (
        <div className="w-full">
            {/* Level Info */}
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-primary-300 text-sm">
                    Level {level}
                </span>
                <span className="text-text-300 text-sm">
                    {currentXP} / {maxXP} XP
                </span>
            </div>

            {/* XP Bar */}
            <div className="w-full bg-neutral-400/30 rounded-full h-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
        </div>
    );
}

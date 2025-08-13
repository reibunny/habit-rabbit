import { useState } from "react";

import { api } from "../utils/axiosInstance";

import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import Modal from "./Modal";

import {
    TargetIcon,
    TextTIcon,
    ShootingStarIcon,
    StarFourIcon,
    StarIcon,
    WrenchIcon,
    PlusIcon,
    CalendarBlankIcon,
} from "@phosphor-icons/react";

import { HABIT_DISCIPLINES } from "../constants/habits";

const HABIT_DIFFICULTIES = [
    {
        value: "easy",
        label: "Easy",
        icon: StarFourIcon,
        xp: "+10 XP",
        gradient: "bg-gradient-accent",
        desc: "Simple daily tasks",
    },
    {
        value: "medium",
        label: "Medium",
        icon: StarIcon,
        xp: "+25 XP",
        gradient: "bg-gradient-secondary",
        desc: "Moderate challenges",
    },
    {
        value: "hard",
        label: "Hard",
        icon: ShootingStarIcon,
        xp: "+50 XP",
        gradient: "bg-gradient-primary",
        desc: "Ambitious goals",
    },
];

export default function HabitForm({ onSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState({
        isTrue: false,
        message: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        discipline: "clarity",
        frequency: "daily",
        difficulty: "easy",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data: newHabit } = await api.post("/habits", formData);
            console.log("New Habit created: ", newHabit);

            setFormData({
                title: "",
                discipline: "clarity",
                frequency: "daily",
                difficulty: "easy",
            });

            onSuccess(newHabit);
        } catch (error) {
            console.error("Failed to create habit: ", error.message);
            setError({ isTrue: true, message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
        >
            {/* Habit Title */}
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="flex items-center ml-2">
                    <TextTIcon size={22} className="mx-2" />
                    <h2>
                        Habit Title <span className="text-red-600">*</span>
                    </h2>
                </label>
                <Input
                    type="text"
                    name="title"
                    placeholder="e.g., Meditate for 10 mins"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                />
            </div>

            {/* Difficulty Selection */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center ml-2">
                    <TargetIcon size={22} className="mx-2" />
                    <h2>
                        Difficulty Level <span className="text-red-600">*</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {HABIT_DIFFICULTIES.map(
                        // eslint-disable-next-line no-unused-vars
                        ({ value, label, icon: Icon, xp, gradient, desc }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() =>
                                    handleInputChange("difficulty", value)
                                }
                                className={`flex items-center justify-between p-2 rounded-2xl hover:scale-105 transition-transform ${
                                    formData.difficulty === value
                                        ? gradient
                                        : "bg-gray-100"
                                }`}
                            >
                                <div className="flex items-center">
                                    <Icon size={44} className="mx-4" />
                                    <div className="text-left">
                                        <h3 className="font-bold text-xl">
                                            {label}
                                        </h3>
                                        <span className="text-sm">{desc}</span>
                                    </div>
                                </div>
                                <span className="p-2 text-xs text-center font-semibold">
                                    {xp}
                                </span>
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Frequency Selection*/}
            <div className="flex flex-col gap-2">
                <div className="flex items-center ml-2">
                    <CalendarBlankIcon size={24} className="mx-2" />
                    <h2>
                        Frequency <span className="text-red-600">*</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { value: "daily", label: "Daily" },
                        { value: "weekly", label: "Weekly" },
                    ].map((freq) => (
                        <button
                            key={freq.value}
                            type="button"
                            onClick={() =>
                                handleInputChange("frequency", freq.value)
                            }
                            className={`p-3 rounded-2xl border-2 transition-all font-semibold ${
                                formData.frequency === freq.value
                                    ? "shadow-primary border-accent-500 bg-gradient-primary text-white"
                                    : "border-gray-200 bg-gray-50 hover:border-purple-300 text-gray-500"
                            }`}
                        >
                            {freq.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Discipline Selection */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center ml-2">
                    <WrenchIcon size={22} className="mx-2" />
                    <h2>
                        Discipline <span className="text-red-600">*</span>
                    </h2>
                </div>
                <Select
                    onChange={(e) =>
                        handleInputChange("discipline", e.target.value)
                    }
                    value={formData.discipline}
                    options={HABIT_DISCIPLINES}
                />
            </div>

            {/* Submit Button */}
            <Button type="submit">
                {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Habit...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center space-x-2">
                        <PlusIcon size={25} />
                        <span>Create Habit</span>
                    </div>
                )}
            </Button>

            {/* Error Modal */}
            {error.isTrue && (
                <Modal
                    status="error"
                    show={error.isTrue}
                    onClose={() => setError({ isTrue: false })}
                >
                    Failed to create new Habit: {error.message}
                </Modal>
            )}
        </form>
    );
}

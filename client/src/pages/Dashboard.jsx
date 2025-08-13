import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CaretDownIcon,
    CaretUpIcon,
    GearSixIcon,
    PlusIcon,
    RabbitIcon,
} from "@phosphor-icons/react";

import { getThemeHex } from "../constants/themes";
import { DIFFICULTY_ORDER } from "../constants/habits";

import XPBar from "../components/XPBar";
import HabitCard from "../components/HabitCard";
import Modal from "../components/Modal";
import Button from "../components/Button";
import HabitForm from "../components/HabitForm";

import { useTheme } from "../hooks/useTheme";
import { api } from "../utils/axiosInstance";

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { theme } = useTheme(token);

    const [user, setUser] = useState(null);
    const [habits, setHabits] = useState([]);
    const [xpData, setXpData] = useState(null);

    const [showCompleted, setShowCompleted] = useState(false);
    const [showHabitForm, setShowHabitForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchUserAndHabits = async () => {
            try {
                if (!token) {
                    navigate("/");
                    return;
                }

                const [{ data: userData }, { data: habitsData }, { data: xp }] =
                    await Promise.all([
                        api.get("/auth/me"),
                        api.get("/habits"),
                        api.get("/user/progress"),
                    ]);

                localStorage.setItem("userId", userData._id);
                setUser(userData);
                setHabits(habitsData);
                setXpData(xp);
            } catch (error) {
                console.error(
                    "Dashboard load error:",
                    error?.response?.data || error.message
                );
                navigate("/");
            }
        };

        fetchUserAndHabits();
    }, [navigate, token]);

    const isToday = (date) => {
        if (!date) return false;
        const d = new Date(date);
        const now = new Date();
        d.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return d.getTime() === now.getTime();
    };

    const sortedHabits = useMemo(() => {
        return habits.slice().sort((a, b) => {
            if (isToday(a.lastCompleted) !== isToday(b.lastCompleted)) {
                return isToday(a.lastCompleted) ? 1 : -1;
            }

            const difficultyA = DIFFICULTY_ORDER[a.difficulty] || 0;
            const difficultyB = DIFFICULTY_ORDER[b.difficulty] || 0;

            return difficultyA - difficultyB;
        });
    }, [habits]);

    const todaysHabits = useMemo(
        () => sortedHabits.filter((habit) => !isToday(habit.lastCompleted)),
        [sortedHabits]
    );

    const completedHabits = useMemo(
        () => sortedHabits.filter((habit) => isToday(habit.lastCompleted)),
        [sortedHabits]
    );

    const handleHabitAdded = (newHabit) => {
        setHabits((prevHabits) => [...prevHabits, newHabit]);
        setShowHabitForm(false);
        setShowSuccess(true);
    };

    const handleCompleteHabit = async (habitId) => {
        try {
            await api.post(`/habits/${habitId}/complete`);
            const { data: xp } = await api.get("/user/progress");
            setXpData(xp);
            setShowCompleted(true);

            setHabits((prevHabits) =>
                prevHabits.map((habit) =>
                    habit._id === habitId
                        ? { ...habit, lastCompleted: new Date().toISOString() }
                        : habit
                )
            );
        } catch (error) {
            console.error("Complete error:", error.message);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-background-300">
            {/* Header */}
            <div className="bg-background-300 backdrop-blur-sm border-b border-primary-300 sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <RabbitIcon
                                color={getThemeHex(theme)}
                                weight="duotone"
                                size="64"
                            />
                            <div>
                                <h1 className="font-bold text-xl text-primary-300">
                                    {user.username}
                                </h1>
                                <p className="text-sm text-text-300">
                                    Level {user.level} Bunny
                                </p>
                            </div>
                        </div>
                        <Link to="/settings">
                            <GearSixIcon
                                size={32}
                                weight="duotone"
                                color={getThemeHex(theme)}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Welcome Card */}
            <div className="max-w-md mx-auto px-4 py-6 space-y-6">
                <div className="bg-background-300 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary-300">
                    <div className="text-center mb-6 flex flex-col items-center">
                        {/* TODO: Display Disciplines XP as a Radar Chart (RPG Stats Style) */}
                        <RabbitIcon
                            color={getThemeHex(theme, "primary")}
                            weight="fill"
                            size="140"
                            className="mb-5"
                        />
                        <h2 className="text-2xl font-bold text-primary-500 mb-2">
                            Welcome, {user.username}!
                        </h2>
                        <p className="text-gray-600">Consistency is key!</p>
                    </div>
                    <XPBar xpData={xpData} />
                </div>
            </div>

            {/* Habits */}
            <div className="flex flex-col">
                {/* Today's Habits */}
                <div className="px-5 flex flex-row items-center justify-between">
                    <h2 className="font-semibold text-text-300 text-xl p-2">
                        Today's Habits
                    </h2>
                    <Button
                        onClick={() => setShowHabitForm(true)}
                        variant="primary"
                        width="16"
                    >
                        <PlusIcon size={16} weight="bold" />
                    </Button>
                </div>

                <div className="space-y-3 p-4">
                    {todaysHabits.length > 0 ? (
                        todaysHabits.map((habit) => (
                            <HabitCard
                                key={habit._id}
                                {...habit}
                                completed={false}
                                onComplete={() =>
                                    setTimeout(
                                        () => handleCompleteHabit(habit._id),
                                        1100
                                    )
                                }
                            />
                        ))
                    ) : (
                        <p className="text-center text-text-300">
                            All habits completed today !
                        </p>
                    )}
                </div>

                {/* Completed Habits */}
                <div className="px-5 space-y-3 flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <Button
                            onClick={() => setShowCompleted(!showCompleted)}
                            variant="secondary"
                            width="10"
                        >
                            {showCompleted ? (
                                <CaretDownIcon size={10} weight="bold" />
                            ) : (
                                <CaretUpIcon size={10} weight="bold" />
                            )}
                        </Button>
                        <h3 className="font-semibold text-text-300 text-xl p-2 mx-4">
                            Completed Today
                        </h3>
                    </div>

                    {showCompleted && (
                        <div className="space-y-3 p-2">
                            {completedHabits.length > 0 ? (
                                completedHabits.map((habit) => (
                                    <HabitCard
                                        key={habit._id}
                                        {...habit}
                                        completed
                                    />
                                ))
                            ) : (
                                <p className="text-center text-text-300">
                                    Nothing yet!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Habit Form Modal */}
            {showHabitForm && (
                <Modal
                    show={showHabitForm}
                    onClose={() => setShowHabitForm(false)}
                >
                    <HabitForm onSuccess={handleHabitAdded} />
                </Modal>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <Modal
                    status="success"
                    show={showSuccess}
                    onClose={() => setShowSuccess(false)}
                >
                    Habit created successfully!
                </Modal>
            )}
        </div>
    );
}

import axios from "axios";

import { RabbitIcon, SignOutIcon, XCircleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Select from "../components/Select";

import { DEFAULT_THEME, getThemeHex, THEME_OPTIONS } from "../constants/themes";

import { useTheme } from "../hooks/useTheme";

export default function Settings() {
    const token = localStorage.getItem("token");

    const { theme, setTheme } = useTheme(token);

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await axios.get(
                    "http://localhost:5000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(res.data);

                if (res.data.theme) {
                    setTheme(res.data.theme);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [token, setTheme]);

    const handleThemeChange = async (newTheme) => {
        try {
            setTheme(newTheme);
            setUser((prev) => ({ ...prev, theme: newTheme }));
        } catch (error) {
            console.log("Error updating theme:", error);
            setTheme(user.theme || DEFAULT_THEME);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.log(error);
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
                                color={getThemeHex(theme, "primary")}
                                weight="duotone"
                                size="64"
                            />
                            <div>
                                <h1 className="font-bold text-2xl text-primary-300">
                                    Settings
                                </h1>
                            </div>
                        </div>

                        <Link to="/dashboard">
                            <XCircleIcon
                                color={getThemeHex(theme, "primary")}
                                size={32}
                                weight="duotone"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* TODO: Disable/Delete Habits */}

            {/* Theme Choice (WIP) */}
            <div className="max-w-md mx-auto px-4 py-6 space-y-6 text-text-300">
                <Select
                    onChange={(e) => handleThemeChange(e.target.value)}
                    value={theme}
                    options={THEME_OPTIONS}
                />

                <SignOutIcon
                    size={64}
                    color={getThemeHex(theme, "primary")}
                    weight="duotone"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}

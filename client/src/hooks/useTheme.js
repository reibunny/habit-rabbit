import { useState, useEffect } from "react";
import { DEFAULT_THEME } from "../constants/themes.js";

export const useTheme = (token) => {
    const [theme, setTheme] = useState(DEFAULT_THEME);

    const applyTheme = (newTheme) => {
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || DEFAULT_THEME;
        applyTheme(savedTheme);
    }, []);

    const updateTheme = async (newTheme) => {
        if (theme === newTheme) return;

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        try {
            await fetch("http://localhost:5000/api/user/theme", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ theme: newTheme }),
            });
        } catch (error) {
            console.error("Failed to update theme on backend:", error.message);
        }
    };

    return {
        theme,
        setTheme: updateTheme,
    };
};

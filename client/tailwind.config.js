/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                text: {
                    300: "var(--text-300)",
                },
                background: {
                    300: "var(--background-300)",
                },
                muted: {
                    text: "var(--muted-text)",
                    300: "var(--muted-300)",
                    500: "var(--muted-500)",
                },
                border: "var(--border-color)",
                primary: {
                    300: "var(--primary-300)",
                    500: "var(--primary-500)",
                },
                secondary: {
                    300: "var(--secondary-300)",
                    500: "var(--secondary-500)",
                },
                accent: {
                    300: "var(--accent-300)",
                    500: "var(--accent-500)",
                },
                error: {
                    300: "var(--error-300)",
                    500: "var(--error-500)",
                },
                success: {
                    300: "var(--success-300)",
                    500: "var(--success-500)",
                },
                info: {
                    300: "var(--info-300)",
                    500: "var(--info-500)",
                },
                warning: {
                    300: "var(--warning-300)",
                    500: "var(--warning-500)",
                },
            },
            boxShadow: {
                primary: "0 4px 20px var(--soft-shadow)",
                "primary-lg": "0 8px 40px var(--soft-shadow)",
            },
            backgroundImage: {
                "gradient-primary": "var(--gradient-primary)",
                "gradient-secondary": "var(--gradient-secondary)",
                "gradient-accent": "var(--gradient-accent)",
                "gradient-text-primary": "var(--gradient-text-primary)",
                "gradient-text-secondary": "var(--gradient-text-secondary)",
                "gradient-text-accent": "var(--gradient-text-accent)",
            },
            animation: {
                "gradient-shift": "gradient-shift 6s ease infinite",
                "slide-in-right": "slideInRight 1s ease-in-out",
            },
            keyframes: {
                "gradient-shift": {
                    "0%": { "background-position": "0% 50%" },
                    "50%": { "background-position": "100% 50%" },
                    "100%": { "background-position": "0% 50%" },
                },
                slideInRight: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};

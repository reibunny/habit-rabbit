/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                text: {
                    300: "var(--text-300)",
                },
                background: {
                    300: "var(--background-300)",
                },
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
                info: {
                    300: "var(--info-300)",
                    500: "var(--info-500)",
                },
                muted: {
                    300: "var(--muted-300)",
                    500: "var(--muted-500)",
                    text: "var(--muted-text)",
                    darker: "var(--muted-darker)",
                },
                border: {
                    DEFAULT: "var(--border-color)",
                },
                shadow: {
                    soft: "var(--soft-shadow)",
                },
            },
            backgroundImage: {
                "gradient-primary": "var(--gradient-primary)",
                "gradient-secondary": "var(--gradient-secondary)",
                "gradient-accent": "var(--gradient-accent)",
                "gradient-success": "var(--gradient-success)",
            },
        },
    },
    plugins: [],
};

export default function Button({
    children,
    type = "button",
    width = "full",
    variant = "primary",
    onClick,
}) {
    const base =
        "p-3 rounded-full text-background-300 font-semibold shadow-md hover:brightness-105 transition";

    const variants = {
        primary: "bg-gradient-primary",
        secondary: "bg-gradient-secondary",
        accent: "bg-gradient-accent",

        error: "bg-gradient-error",
        success: "bg-gradient-success",
        info: "bg-gradient-info",
    };

    return (
        <button
            type={`${type}`}
            className={`${base} ${variants[variant]} w-${width}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

import { RabbitIcon, XIcon } from "@phosphor-icons/react";
import Button from "./Button";

const styles = [
    {
        status: "error",
        title: "Oops, an error occurred!",
        style: "text-center text-error-300",
    },
    {
        status: "success",
        title: "Yipee!!",
        style: "text-center text-success-300",
    },
    {
        status: "info",
        title: "By the way...",
        style: "text-center text-info-300",
    },
];

const getStyleByStatus = (status) => {
    return (
        styles.find((s) => s.status === status) || {
            title: "Add New Habit",
            style: "",
        }
    );
};

export default function Modal({ status, show, onClose, children }) {
    const { title, style } = getStyleByStatus(status);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="relative flex flex-col gap-2 bg-white/90 rounded-2xl shadow-xl p-6 w-11/12 max-w-md animate-fade-in">
                {/* Close Button */}
                <div className="absolute top-4 right-4 cursor-pointer">
                    <XIcon size={28} weight="bold" onClick={onClose} />
                </div>

                {/* Header */}
                {status ? (
                    <div className="text-center">
                        <h2 className={`text-xl font-semibold ${style}`}>
                            {title}
                        </h2>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <RabbitIcon weight="fill" size="55" />
                        <div className="flex flex-col items-start">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <p>Let's create a new habit together!</p>
                        </div>
                    </div>
                )}

                {/* Body */}
                <div className="flex flex-col gap-2">
                    <div className={`p-4 ${style}`}>{children}</div>
                </div>

                {!!status && (
                    <Button variant={status} onClick={onClose}>
                        Understood
                    </Button>
                )}
            </div>
        </div>
    );
}

import { CheckIcon, ChecksIcon } from "@phosphor-icons/react";

export default function CompleteButton({ completed, size, onComplete }) {
    return (
        <button
            onClick={onComplete}
            className={`rounded-full w-${size} h-${size} p-3 flex justify-center items-center ${
                completed ? "bg-neutral-500/30" : "bg-gradient-primary"
            }`}
        >
            {completed ? (
                <ChecksIcon size={size} color="#707070" />
            ) : (
                <CheckIcon size={size} color="white" />
            )}
        </button>
    );
}

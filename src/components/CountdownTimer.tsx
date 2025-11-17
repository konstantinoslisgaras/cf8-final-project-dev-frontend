import { useEffect, useState } from "react";

const CountdownTimer = ({ eventDate }: { eventDate: string }) => {
    const [timeRemaining, setTimeRemaining] = useState(0);

    const parseDate = (eventDate: string) => {
        const [datePart, timePart] = eventDate.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes).getTime();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const eventTime = parseDate(eventDate);
            let remaining = eventTime - now;

            if (remaining <= 0) {
                remaining = 0;
                clearInterval(interval);
            }

            setTimeRemaining(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [eventDate]);

    const formatTime = (ms: number) => {
        const sec = Math.floor((ms / 1000) % 60);
        const min = Math.floor((ms / 1000 / 60) % 60);
        const hr = Math.floor((ms / 1000 / 60 / 60) % 24);
        const day = Math.floor(ms / 1000 / 60 / 60 / 24);

        return `${day}d ${hr}h ${min}m ${sec}s`;
    };

    return (
        <div className="flex justify-center mt-2">
            <div
                className="
                    flex items-center bg-oly-red-dark text-white
                    rounded-full shadow-lg border border-red-800/60
                    px-3 mt-2 py-1.5 text-xs font-semibold tracking-wide
                    ring-2 ring-red-500/30
                    shadow-red-900/40 w-[130px] justify-center
                "
                style={{ transform: "scale(0.92)" }}
            >
                {timeRemaining > 0 ? (
                    <span className="drop-shadow-md">{formatTime(timeRemaining)}</span>
                ) : (
                    <span className="drop-shadow-md">MATCH STARTED</span>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;
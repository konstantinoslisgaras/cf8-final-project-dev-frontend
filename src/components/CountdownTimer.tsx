import { useEffect, useState, useMemo } from "react";

const CountdownTimer = ({ eventDate }: { eventDate: string }) => {
    const eventTimestamp = useMemo(() => {
        const [datePart, timePart] = eventDate.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes).getTime();
    }, [eventDate]);

    const [remaining, setRemaining] = useState<number | null>(null);

    useEffect(() => {
        const update = () => {
            const diff = eventTimestamp - Date.now();
            setRemaining(diff > 0 ? diff : 0);
        };

        update(); // 👉 run immediately so no bulge / no flashing message
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [eventTimestamp]);

    if (remaining === null) {
        return (
            <div className="flex justify-center mt-2">
                <div className="bg-gradient-to-br from-oly-red-dark to-red-800 text-white rounded-lg shadow-md border border-red-700/50 px-3 py-2 min-w-[180px] h-[40px] animate-pulse" />
            </div>
        );
    }

    if (remaining === 0) {
        return (
            <div className="flex justify-center mt-2">
                <div className="bg-gradient-to-br from-oly-red-dark to-red-800 text-white rounded-lg shadow-md border border-red-700/50 px-3 py-2 min-w-[180px] h-[40px] flex items-center justify-center">
                    <span className="text-[11px] font-semibold tracking-wide text-red-100">
                        MATCH STARTED
                    </span>
                </div>
            </div>
        );
    }

    const sec = Math.floor((remaining / 1000) % 60);
    const min = Math.floor((remaining / 1000 / 60) % 60);
    const hr = Math.floor((remaining / 1000 / 60 / 60) % 24);
    const day = Math.floor(remaining / 1000 / 60 / 60 / 24);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className="flex justify-center mt-2">
            <div className="
                bg-gradient-to-br from-oly-red-dark to-red-800
                text-white rounded-lg shadow-md border border-red-700/50
                px-3 py-2 min-w-[180px] h-[40px]
                flex items-center justify-center space-x-2
            ">
                {[{ n: day, label: "D" }, { n: hr, label: "H" }, { n: min, label: "M" }, { n: sec, label: "S" }].map((t, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                        <span className="text-sm font-bold tabular-nums">{pad(t.n)}</span>
                        <span className="text-[9px] text-red-200 font-medium">{t.label}</span>
                        {idx < 3 && <span className="text-xs text-red-300 font-bold">:</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;

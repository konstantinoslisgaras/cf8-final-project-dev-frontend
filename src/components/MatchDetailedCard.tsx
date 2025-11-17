import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.tsx";
import type { MatchDetailedProps } from "../types/types.ts";

interface MatchDetailedCardProps {
    match: MatchDetailedProps;
}

const MatchDetailedCard =({ match }: MatchDetailedCardProps) => {
    const {
        olympiacosName, opponentName, olympiacosGoals, opponentGoals, date, time, ground, result,
        day, competition, matchNumber, description, season
    } = match;

    if (!result) return null;

    let bgColor = "bg-blue-200";
    switch (competition) {
        case "UEFA Champions League": bgColor = "bg-yellow-200"; break;
        case "Greek Football Cup": bgColor = "bg-pink-200"; break;
    }

    // Badge color based on outcome
    let variant = "outline";
    switch (result) {
        case "WIN": variant = "bg-green-400 text-white"; break;
        case "DRAW": variant = "bg-yellow-400 text-white"; break;
        case "LOSS": variant = "bg-red-400 text-white"; break;
    }

    // HOME / AWAY title
    const title =
        ground === "HOME" ? (
            <>
                <span className="text-oly-red-dark">{olympiacosName}</span>
                <span className="text-gray-600 mx-1">VS</span>
                <span className="text-black">{opponentName}</span>
            </>
        ) : (
            <>
                <span className="text-black">{opponentName}</span>
                <span className="text-gray-600 mx-1">VS</span>
                <span className="text-oly-red-dark">{olympiacosName}</span>
            </>
        );

    const leftScore = ground === "HOME" ? olympiacosGoals : opponentGoals;
    const rightScore = ground === "AWAY" ? olympiacosGoals : opponentGoals;
    const displayLeft = leftScore ?? "-";
    const displayRight = rightScore ?? "-";

    return (
        <Card className={`relative w-full max-w-md border border-gray-300 shadow-lg ${bgColor} hover:shadow-xl transition-shadow`}>
            <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">
                Match #{matchNumber}
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xl font-semibold text-center">{title}</CardTitle>
                <div className="flex flex-col items-center gap-1 mt-2 text-sm text-gray-800">
                    <span className="font-medium">{day}, {date} - {time}</span>
                    <span className="font-semibold text-gray-700">{competition} | Season {season}</span>
                </div>
            </CardHeader>

            <CardContent className="flex items-center justify-between mt-2 mb-2 px-6">
                <div className="text-center">
                    <p className="text-2xl font-bold">{displayLeft}</p>
                    <p className="text-sm text-gray-500">Home</p>
                </div>
                <span className="text-black text-xl font-semibold">:</span>
                <div className="text-center">
                    <p className="text-2xl font-bold">{displayRight}</p>
                    <p className="text-sm text-gray-500">Away</p>
                </div>
            </CardContent>

            <div className="px-8 py-3 text-center text-gray-800 text-md md:text-base font-medium
                    border-t border-b border-gray-300 bg-gray-50">
                <p className="line-clamp-2">{description}</p>
            </div>
            <div className="flex justify-center gap-2 pb-4 pt-2 mt-auto">
                <span className={`px-4 py-1 rounded-full font-semibold ${variant}`}>
                    {result}
                </span>
            </div>
        </Card>
    );
};

export default MatchDetailedCard;
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import type { MatchBasicProps } from "../types/types.ts";

interface MatchBasicCardProps {
    match: MatchBasicProps;
}

const MatchBasicCard =({ match }: MatchBasicCardProps) => {
    const { olympiacosName, opponentName, olympiacosGoals, opponentGoals, date, time, ground, result } = match;

    let bgColor = "bg-gray-100";
    let variant = "outline";
    switch (result) {
        case "WIN": bgColor = "bg-green-100"; variant = "secondary"; break;
        case "DRAW": bgColor = "bg-yellow-100"; break;
        case "LOSS": bgColor = "bg-red-100"; variant = "destructive"; break;
    }

    const title =
        ground === "HOME" ? (
            <>
                <span className="text-oly-red-dark">{olympiacosName}</span>
                <span className="text-gray-600"> VS </span>
                <span className="text-black">{opponentName}</span>
            </>
        ) : (
            <>
                <span className="text-black">{opponentName}</span>
                <span className="text-gray-600"> VS </span>
                <span className="text-oly-red-dark">{olympiacosName}</span>
            </>
        )

    const leftScore = ground === "HOME" ? olympiacosGoals : opponentGoals;
    const rightScore = ground === "AWAY" ? olympiacosGoals : opponentGoals;
    const displayLeft = leftScore ?? "-";
    const displayRight = rightScore ?? "-";
    const displayResult = result ?? "UPCOMING";

    return (
        <>
            <Card className={`w-full max-w-sm border border-gray-300 bg-white/90 shadow-lg ${bgColor} hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-center">
                        {title}
                    </CardTitle>
                    <p className="text-md text-gray-950 text-center">{date} - {time}</p>
                </CardHeader>

                <CardContent className="flex items-center justify-between mt-1">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{displayLeft}</p>
                        <p className="text-sm text-gray-500">Home</p>
                    </div>
                    <span className="text-black text-lg font-semibold">:</span>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{displayRight}</p>
                        <p className="text-sm text-gray-500">Away</p>
                    </div>
                </CardContent>

                <div className="flex justify-center gap-2 pb-3">
                    <Badge className={variant}>
                        {displayResult}
                    </Badge>
                </div>
            </Card>
        </>
    );
}

export default MatchBasicCard;
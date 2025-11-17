import type { CompetitionProps } from "../types/types.ts";
import { Card, CardContent, CardHeader } from "./ui/card.tsx";
import { Info, Trophy } from "lucide-react";

interface CompetitionCardProps {
    competition: CompetitionProps;
}

const CompetitionCard = ({ competition }: CompetitionCardProps) => {
    const { competitionName, olympiacosTrophies, competitionPosition, competitionPoints, competitionInfo, participating } = competition;

    const isUEFAConferenceLeague = competitionName === "UEFA Conference League";

    return (
        <Card className="w-full max-w-3xl bg-white shadow-md rounded-2xl border border-gray-200 mx-auto hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="bg-oly-red-dark text-white rounded-t-2xl py-4 text-center">
                <h2 className="text-2xl font-bold">{competitionName}</h2>
            </CardHeader>

            <CardContent className="p-6 space-y-6 text-gray-800">
                {/* Competition Info Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-oly-red-dark" />
                        <h3 className="text-gray-900 font-semibold text-sm sm:text-base">
                            About the Competition
                        </h3>
                    </div>
                    <p className="text-justify leading-relaxed text-sm sm:text-base whitespace-pre-line">
                        {competitionInfo}
                    </p>
                </div>

                {/* Olympiacos Trophies - only show if > 0 */}
                {olympiacosTrophies > 0 && (
                    <div className={`flex items-center justify-center gap-2 border rounded-lg py-2 px-3 ${
                        isUEFAConferenceLeague
                            ? "bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 shadow-lg"
                            : "bg-yellow-50 border-yellow-200"
                    }`}>
                        <Trophy className={`w-5 h-5 ${isUEFAConferenceLeague ? "text-yellow-600" : "text-yellow-600"}`} />
                        <span className={`font-semibold text-sm sm:text-base ${
                            isUEFAConferenceLeague ? "text-amber-800" : "text-yellow-700"
                        }`}>
                            Olympiacos has won this competition {olympiacosTrophies}{" "}
                            {olympiacosTrophies === 1 ? "time" : "times"}
                        </span>
                    </div>
                )}

                {/* Participation Status */}
                <div className="text-center pt-2">
                    <span
                        className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                            participating
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-gray-100 text-gray-600 border border-gray-300"
                        }`}
                    >
                        {participating ? "Competing" : "Not Participating this season"}
                    </span>
                </div>

                {/* Live Position + Points */}
                {participating && (
                    <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-oly-red-dark" />
                            <span className="text-gray-900 font-semibold text-sm sm:text-base">
                                Current Position:{" "}
                                <span className="text-oly-red-dark">{competitionPosition}</span>
                            </span>
                        </div>

                        <div className="text-gray-900 font-semibold text-sm sm:text-base">
                            Current Points:{" "}
                            <span className="text-oly-red-dark">{competitionPoints}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CompetitionCard;
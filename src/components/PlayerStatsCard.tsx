import type { PlayerStatsProps } from "../types/types.ts";
import { Card, CardContent, CardHeader } from "./ui/card.tsx";
import { ClipboardCheck, Clock, Footprints, Trophy, Scale, Shield, Volleyball, XCircle, TicketSlash, TicketX } from "lucide-react";
import type {JSX} from "react";

interface PlayerStatsCardProps {
    stats: PlayerStatsProps
}

const PlayerStatsCard = ({ stats }: PlayerStatsCardProps) => {
    const { name, position, goals, assists, yellowCards, redCards, goalsConceded, minutesPlayed,
    matchesPlayed, wins, draws, losses } = stats;

    const isGoalkeeper = position.includes("GOALKEEPER");

    const statBox = (
        icon: JSX.Element,
        label: string,
        value: number | string,
    ) => (
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
            <div className="mb-2">{icon}</div>
            <div className="text-xl font-semibold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    );

    return (
        <>
            <Card className="w-full max-w-5xl bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-2xl border border-gray-200 mb-12">
                <CardHeader className="bg-gradient-to-r from-oly-red-dark to-oly-red text-white rounded-t-2xl py-6 text-center shadow-sm">
                    <h2 className="text-3xl font-bold tracking-wide">{name}</h2>
                    <p className="text-md font-semibold opacity-90 mt-1">{position}</p>
                </CardHeader>

                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-6">
                    {statBox(<Volleyball className="w-5 h-5 text-oly-red-dark" />, "Goals", goals)}
                    {statBox(<Footprints className="w-5 h-5 text-oly-red-dark" />, "Assists", assists)}
                    {statBox(<TicketSlash className="w-5 h-5 text-yellow-500" />, "Yellow Cards", yellowCards)}
                    {statBox(<TicketX className="w-5 h-5 text-red-600" />, "Red Cards", redCards)}
                    {isGoalkeeper && statBox(<Shield className="w-5 h-5 text-gray-700" />, "Goals Conceded", goalsConceded)}
                    {statBox(<Clock className="w-5 h-5 text-blue-600" />, "Minutes Played", minutesPlayed)}
                    {statBox(<ClipboardCheck className="w-5 h-5 text-green-600" />, "Matches Played", matchesPlayed)}

                    <div className="col-span-2 sm:col-span-3 md:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-center items-center gap-6 mb-2">
                            <div className="flex flex-col items-center w-20">
                                <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold w-full">
                                    <Trophy className="w-4 h-4" /> {wins}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Wins</p>
                            </div>
                            <div className="flex flex-col items-center w-20">
                                <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold w-full">
                                    <Scale className="w-4 h-4" /> {draws}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Draws</p>
                            </div>
                            <div className="flex flex-col items-center w-20">
                                <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold w-full">
                                    <XCircle className="w-4 h-4" /> {losses}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Losses</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default PlayerStatsCard;
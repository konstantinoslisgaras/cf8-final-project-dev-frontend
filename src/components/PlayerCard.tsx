import { Card, CardHeader, CardContent } from './ui/card';
import type { PlayerProps } from "../types/types.ts";
import {Crown, Flag, PersonStanding, Calendar, BarChart3, Book} from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button.tsx";
import {useNavigate} from "react-router";

interface PlayerCardProps {
    player: PlayerProps;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    const { id, lastname, firstname, shirtNumber, position, nationality, birthYear, captain } = player;
    const navigate = useNavigate();

    const handleBiography =() => {
        navigate(`/api/players/${id}/${id.replace("PL", "DB")}`);
    }

    const handleStatistics =() => {
        navigate(`/api/statistics/players/PS${id}`);
    }

    return (
        <>
            <Card
                className="w-64 text-center bg-white/85 shadow-md hover:shadow-xl transition-all duration-200
                rounded-2xl border border-gray-200 flex flex-col justify-between">

                <CardHeader
                    className="bg-oly-red-dark text-white rounded-t-2xl py-1 text-center flex flex-col items-center gap-0.5">
                    <span className="font-bold text-lg">#{shirtNumber}</span>
                    <span className="font-semibold">{lastname}</span>
                    <span className="font-semibold">{firstname || "\u00A0"}</span>
                </CardHeader>

                <CardContent className="text-center py-2 space-y-1">
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <PersonStanding className="w-3.5 h-3.5"/> {position}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <Flag className="w-3.5 h-3.5"/> {nationality}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <Calendar className="w-3.5 h-3.5"/> {new Date().getFullYear() - birthYear} yrs
                    </p>
                    {captain && (
                        <span className="mt-2 inline-flex items-center gap-1 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                            <Crown className="w-2 h-2"/>
                            Captain
                        </span>
                    )}
                </CardContent>

                <div className="flex justify-between items-center px-3 pb-3 gap-2">
                    <Button
                        size="sm"
                        onClick={handleBiography}
                        className="flex-1 flex items-center justify-center gap-1 bg-white border border-oly-red-dark text-oly-red-dark
                        hover:bg-oly-red-dark hover:text-white transition-all rounded-lg shadow-sm cursor-pointer"
                    >
                        <Book className="w-4 h-4" />
                        Bio
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleStatistics}
                        className="flex-1 flex items-center justify-center gap-1 bg-oly-red-dark text-white
                        hover:shadow-lg hover:shadow-oly-red-dark/40 hover:-translate-y-0.5 transition-all rounded-lg cursor-pointer"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Stats
                    </Button>
                </div>
            </Card>
        </>
    )
}

export default PlayerCard;
import { Card, CardHeader, CardContent } from './ui/card';
import type { CoachProps } from "../types/types.ts";
import * as React from "react";
import {Button} from "./ui/button.tsx";
import {BarChart3, Book, Flag, PersonStanding, User} from "lucide-react";
import {useNavigate} from "react-router";

interface CoachCardProps {
    coach: CoachProps;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
    const { id, lastname, firstname, nationality, birthYear, } = coach;
    const navigate = useNavigate();

    const handleBiography =() => {
        navigate(`/api/coach/${id}/${id.replace("MG", "DB")}`);
    }

    const handleStatistics =() => {
        navigate(`/api/statistics/coach/CS${id}`);
    }

    return (
        <>
            <Card className="w-128 text-center bg-white/85 shadow-md hover:shadow-xl transition-all duration-200
                rounded-2xl border border-gray-200 flex flex-col justify-between">

                <CardHeader
                    className="bg-oly-red-dark text-white rounded-t-2xl py-1 text-center flex flex-col items-center gap-0.5">
                    <span className="font-semibold">{lastname}</span>
                    <span className="font-semibold">{firstname || "\u00A0"}</span>
                </CardHeader>

                <CardContent className="text-center py-3">
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <PersonStanding className="w-3.5 h-3.5"/> Coach
                    </p>
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <Flag className="w-4 h-4"/> {nationality}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <User className="w-4 h-4"/> {new Date().getFullYear() - birthYear} yrs
                    </p>
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
};

export default CoachCard;
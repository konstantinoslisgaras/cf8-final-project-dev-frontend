import type { HistoryProps } from "../types/types.ts";
import {Card, CardContent, CardHeader} from "./ui/card.tsx";
import { History, Trophy } from "lucide-react";

interface HistoryCardProps {
    olympiacosHistory: HistoryProps;
}

const HistoryCard = ({ olympiacosHistory }: HistoryCardProps) => {
    const { name, trophies, history } = olympiacosHistory;

    return (
        <>
            <Card className="w-full max-w-5xl bg-white shadow-md rounded-2xl border border-gray-200 mx-auto mb-16">
                <CardHeader className="bg-oly-red-dark text-white rounded-t-2xl py-4 text-center">
                    <h2 className="text-3xl font-bold">{name}</h2>
                </CardHeader>

                <CardContent className="p-6 space-y-6 text-gray-800">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Trophy className="w-5 h-5 text-oly-red-dark" />
                            <h3 className="text-lg font-semibold text-gray-900">Major Trophies</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm sm:text-base font-medium">
                            {trophies
                                .split("\n")
                                .filter((line) => line.trim() !== "" && line !== "Major Trophies:") // remove empty and title line
                                .map((line, index) => (
                                    <li key={index} className="text-gray-900">
                                        {line.trim()}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <History className="w-5 h-5 text-oly-red-dark" />
                            <h3 className="text-lg font-semibold text-gray-900">Club History</h3>
                        </div>
                        <p className="text-justify leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {history}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
};

export default HistoryCard;
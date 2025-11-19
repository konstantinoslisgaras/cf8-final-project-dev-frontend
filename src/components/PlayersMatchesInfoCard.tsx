import * as React from "react";
import { Card, CardHeader, CardContent } from "./ui/card.tsx";
import {
    Calendar,
    Clock,
    Trophy,
    CalendarDays,
    Award,
    Target,
    Building
} from "lucide-react";

interface PlayerMatchesInfoCardProps {
    competition: string;
    season: string;
    ground: string;
    date: string;
    time: string;
    day?: string;
    matchNumber?: number;
    coachName?: string;
    description?: string;
}

const PlayersMatchesInfoCard: React.FC<PlayerMatchesInfoCardProps> = ({
                                                                          competition,
                                                                          season,
                                                                          ground,
                                                                          date,
                                                                          time,
                                                                          day,
                                                                          matchNumber,
                                                                          coachName,
                                                                          description
                                                                      }) => {
    return (
        <Card className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-gray-200 mx-auto overflow-hidden">
            {/* HEADER */}
            <CardHeader className="bg-gradient-to-r from-oly-red-dark to-oly-red text-white rounded-t-2xl py-5 text-center shadow-sm">
                <h2 className="text-xl font-bold tracking-wide">Match Information</h2>
            </CardHeader>

            <CardContent className="p-6 space-y-5">

                {/* DESCRIPTION */}
                {description && (
                    <p className="text-sm font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                        {description}
                    </p>
                )}

                {/* DATE & TIME */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-gray-500">DATE</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{date}</p>
                        {day && <p className="text-xs text-gray-500 mt-1">{day}</p>}
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-medium text-gray-500">TIME</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{time}</p>
                    </div>
                </div>

                {/* MATCH NUMBER & GROUND */}
                <div className="grid grid-cols-2 gap-4">
                    {matchNumber && (
                        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-orange-600" />
                                <span className="text-xs font-medium text-gray-500">MATCH NUMBER</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">#{matchNumber}</p>
                        </div>
                    )}

                    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Building className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-gray-500">GROUND</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 capitalize">
                            {ground.toLowerCase()}
                        </p>
                    </div>
                </div>

                {/* COMPETITION & SEASON */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-medium text-gray-500">COMPETITION</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{competition}</p>
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-medium text-gray-500">SEASON</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{season}</p>
                    </div>
                </div>

                {/* COACH - STANDS OUT MORE */}
                {coachName && (
                    <div className="p-5 bg-gradient-to-r from-slate-50 to-gray-100 border-2 border-oly-red/20 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <Award className="w-5 h-5 text-oly-red-dark" />
                            <span className="text-sm font-bold text-gray-700">HEAD COACH</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 text-center" title={coachName}>
                            {coachName}
                        </p>
                    </div>
                )}

            </CardContent>
        </Card>
    );
};

export default PlayersMatchesInfoCard;
import { Card, CardHeader, CardContent } from './ui/card';
import type { TeamStatsProps } from "../types/types.ts";
import {
    Trophy,
    Shield,
    Scale,
    XCircle, Volleyball, Footprints, TicketSlash, TicketX, ClipboardCheck
} from "lucide-react";
import * as React from "react";

interface TeamStatsCardProps {
    teamStats: TeamStatsProps;
}

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ teamStats }) => {
    const { season, goals, assists, goalsConceded, yellowCards, redCards, wins, draws, losses, totalMatches } = teamStats;

    return (
        <>
            <Card className="w-full max-w-5xl bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-2xl border border-gray-200 mx-auto mb-16">
                <CardHeader className="bg-gradient-to-r from-oly-red-dark to-oly-red text-white rounded-t-2xl py-6 text-center shadow-sm">
                    <h1 className="text-3xl font-bold tracking-wide">Olympiacos FC</h1>
                    <p className="text-md font-semibold opacity-90 mt-1">Season {season}</p>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Area 1: Basic Stats */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">
                            Total Stats
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                            {/* Results Stats */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Trophy className="w-7 h-7 text-green-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{wins}</div>
                                <div className="text-xs text-gray-500">Wins</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Scale className="w-7 h-7 text-yellow-500" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{draws}</div>
                                <div className="text-xs text-gray-500">Draws</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <XCircle className="w-7 h-7 text-red-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{losses}</div>
                                <div className="text-xs text-gray-500">Losses</div>
                            </div>

                            {/* Goals/Assists/GoalsConceded Stats */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Volleyball className="w-7 h-7 text-oly-red-dark" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{goals}</div>
                                <div className="text-xs text-gray-500">Goals Scored</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Footprints className="w-7 h-7 text-oly-red-dark" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{assists}</div>
                                <div className="text-xs text-gray-500">Assists</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Shield className="w-7 h-7 text-gray-700" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{goalsConceded}</div>
                                <div className="text-xs text-gray-500">Goals Conceded</div>
                            </div>

                            {/* Discipline Stats */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <TicketSlash className="w-7 h-7 text-yellow-500" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{yellowCards}</div>
                                <div className="text-xs text-gray-500">Yellow Cards</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <TicketX className="w-7 h-7 text-red-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{redCards}</div>
                                <div className="text-xs text-gray-500">Red Cards</div>
                            </div>

                            {/*Total Matches*/}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <ClipboardCheck className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">{totalMatches}</div>
                                <div className="text-xs text-gray-500">Total Matches</div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-1/2 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                    </div>

                    {/* Area 2: Advanced Ratios & Averages */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">
                            Stat Ratios & Averages
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                            {/* Match Result Ratios */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Trophy className="w-7 h-7 text-green-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0}%
                                </div>
                                <div className="text-xs text-gray-500">Win Ratio</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Scale className="w-7 h-7 text-yellow-500" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? Math.round((draws / totalMatches) * 100) : 0}%
                                </div>
                                <div className="text-xs text-gray-500">Draw Ratio</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <XCircle className="w-7 h-7 text-red-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? Math.round((losses / totalMatches) * 100) : 0}%
                                </div>
                                <div className="text-xs text-gray-500">Loss Ratio</div>
                            </div>

                            {/* Goals Averages */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Volleyball className="w-7 h-7 text-green-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? (goals / totalMatches).toFixed(1) : 0}
                                </div>
                                <div className="text-xs text-gray-500">Goals/Match</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Footprints className="w-7 h-7 text-purple-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? (assists / totalMatches).toFixed(1) : 0}
                                </div>
                                <div className="text-xs text-gray-500">Assists/Match</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <Shield className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? (goalsConceded / totalMatches).toFixed(1) : 0}
                                </div>
                                <div className="text-xs text-gray-500">Conceded/Match</div>
                            </div>

                            {/* Discipline Averages */}
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <TicketSlash className="w-7 h-7 text-yellow-500" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? (yellowCards / totalMatches).toFixed(1) : 0}
                                </div>
                                <div className="text-xs text-gray-500">Yellows/Match</div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <div className="mb-3">
                                    <TicketX className="w-7 h-7 text-red-600" />
                                </div>
                                <div className="text-xl font-semibold text-gray-900">
                                    {totalMatches > 0 ? (redCards / totalMatches).toFixed(1) : 0}
                                </div>
                                <div className="text-xs text-gray-500">Reds/Match</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default TeamStatsCard;
import { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient.ts"; // our JWT-enabled axios
import MatchBasicCard from "../../cards/Matches/MatchBasicCard.tsx";
import StatLeadersCard from "../../cards/HomePage/StatLeadersCard.tsx";
import CountdownTimer from "../../cards/HomePage/CountdownTimer.tsx";
import CompetitionsStatusCard from "../../cards/HomePage/CompetitionStatusCard.tsx";
import type { HomePageProps } from "../../../types/types.ts";
import CurrentStreak from "../../cards/HomePage/CurrentStreak.tsx";

const HomePage = () => {
    const [info, setInfo] = useState<HomePageProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Unofficial Olympiacos FC Stats";

        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get<HomePageProps>("/homepage");
                console.log("🔍 Homepage API Response:", data);
                setInfo(data);
            } catch (err) {
                console.error("Failed to load homepage data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading homepage...</p>;
    if (!info) return <p className="text-center mt-10 text-gray-600">No data available.</p>;

    const combinedPlayers = [
        ...(info.top5Scorers ?? []),
        ...(info.top5Assists ?? [])
    ];

    const uniquePlayersMap = new Map<string, typeof combinedPlayers[0]>();

    combinedPlayers.forEach(p => {
        if (!uniquePlayersMap.has(p.playerId)) {
            uniquePlayersMap.set(p.playerId, p);
        } else {
            const existing = uniquePlayersMap.get(p.playerId)!;
            uniquePlayersMap.set(p.playerId, {
                ...existing,
                goals: existing.goals ?? 0,
                assists: existing.assists ?? 0
            });
        }
    });

    const goalsAssistsLeaders = Array.from(uniquePlayersMap.values())
        .map(p => ({
            ...p,
            goalsAssists: (p.goals ?? 0) + (p.assists ?? 0)
        }))
        .sort((a, b) => b.goalsAssists - a.goalsAssists)
        .slice(0, 5);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 mb-15">
            <h1 className="text-4xl font-extrabold text-oly-red-dark text-center tracking-tight">
                Olympiacos FC Stats Dashboard
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {info.previousMatch && (
                    <div className="flex flex-col items-center lg:items-start">
                        <span className="px-5 py-2 bg-oly-red-dark text-white font-semibold rounded-full mb-4 shadow text-sm uppercase tracking-wide">
                            Latest Match
                        </span>
                        <MatchBasicCard match={info.previousMatch} />
                        {info.currentStreak && <CurrentStreak currentStreak={info.currentStreak} />}
                    </div>
                )}

                <CompetitionsStatusCard competitions={info.competitionsStatus} />

                {info.nextMatch && (
                    <div className="flex flex-col items-center lg:items-end">
                        <span className="px-5 py-2 bg-oly-red-dark text-white font-semibold rounded-full mb-4 shadow text-sm uppercase tracking-wide">
                            Next Match
                        </span>
                        <MatchBasicCard match={info.nextMatch} />
                        <CountdownTimer eventDate={`${info.nextMatch.date} ${info.nextMatch.time}`} />
                    </div>
                )}
            </div>

            <div className="bg-gray-50 py-8 px-6 rounded-3xl shadow-inner">
                <h2 className="text-2xl font-bold text-oly-red-dark text-center mb-8">
                    Stat Leaders
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 xl:gap-12">
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Top Scorer" leaders={info.top5Scorers} statKey="goals" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Assist Leader" leaders={info.top5Assists} statKey="assists" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Goals & Assists Leader" leaders={goalsAssistsLeaders} statKey="goalsAssists" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Most Wins" leaders={info.top5MostWins} statKey="wins" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Minutes Played" leaders={info.top5MinutesPlayedLeaders} statKey="minutesPlayed" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Matches Played" leaders={info.top5MatchesPlayedLeaders} statKey="matchesPlayed" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Yellow Cards" leaders={info.top5MostYellowCards} statKey="yellowCards" />
                    </div>
                    <div className="h-[28rem]">
                        <StatLeadersCard title="Red Cards" leaders={info.top5MostRedCards} statKey="redCards" />
                    </div>
                </div>
            </div>

            {/* Fans */}
            {info.top10Fans && info.top10Fans.length > 0 && (
                <div className="bg-white py-10 px-6 rounded-3xl shadow">
                    <h2 className="text-2xl font-bold text-oly-red-dark text-center mb-10">
                        Top 10 Most Supported Players
                    </h2>
                    <div className="space-y-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {info.top10Fans.slice(0, 5).map((p, idx) => (
                                <div
                                    key={p.id}
                                    className="flex flex-col items-center bg-gray-50 shadow-inner p-4 rounded-xl border border-gray-200"
                                >
                                    <span className="text-sm font-semibold text-oly-red-dark mb-2">
                                        #{idx + 1}
                                    </span>
                                    <span className="text-lg font-bold text-gray-900 tracking-wide">
                                        {p.name}
                                    </span>
                                    <span className="text-sm text-gray-700 font-medium mt-1">
                                        Fans: {p.fans}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {info.top10Fans.slice(5, 10).map((p, idx) => (
                                <div
                                    key={p.id}
                                    className="flex flex-col items-center bg-gray-50 shadow-inner p-4 rounded-xl border border-gray-200"
                                >
                                    <span className="text-sm font-semibold text-oly-red-dark mb-2">
                                        #{idx + 6}
                                    </span>
                                    <span className="text-lg font-bold text-gray-900 tracking-wide">
                                        {p.name}
                                    </span>
                                    <span className="text-sm text-gray-700 font-medium mt-1">
                                        Fans: {p.fans}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;

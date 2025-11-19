import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api.ts";
import MatchBasicCard from "../../MatchBasicCard.tsx";
import StatLeadersCard from "../../StatLeadersCard.tsx";
import type { StatLeadersInfoProps, MatchBasicProps, CompetitionProps, PlayerStat } from "../../../types/types.ts";
import CountdownTimer from "../../CountdownTimer.tsx";
import CompetitionsStatusCard from "../../CompetitionStatusCard.tsx";

type HomePageInfo = {
    previousMatch?: MatchBasicProps;
    nextMatch?: MatchBasicProps;
    statLeaders?: StatLeadersInfoProps;
    competitionsStatus?: CompetitionProps[];
    top5Scorers?: PlayerStat[];
    topScorer?: PlayerStat;
    top5Assists?: PlayerStat[];
    assistLeader?: PlayerStat;
    top5MostWins?: PlayerStat[];
    mostWins?: PlayerStat;
    top5MinutesPlayedLeaders?: PlayerStat[];
    minutesPlayedLeader?: PlayerStat;
    top5MatchesPlayedLeaders?: PlayerStat[];
    matchesPlayedLeader?: PlayerStat;
    top5MostYellowCards?: PlayerStat[];
    mostYellowCards?: PlayerStat;
    top5MostRedCards?: PlayerStat[];
    mostRedCards?: PlayerStat;
};

const HomePage = () => {
    const [info, setInfo] = useState<HomePageInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Olympiacos FC Stats";

        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/homepage`);
                const data = await response.json();
                console.log("🔍 Homepage API Response:", data);
                setInfo(data);
            } catch (err) {
                console.error("Failed to load homepage data:", err);
            } finally {
                setLoading(false);
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-gray-600">Loading homepage...</p>;
    }

    if (!info) {
        return <p className="text-center mt-10 text-gray-600">No data available.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <h1 className="text-4xl font-extrabold text-oly-red-dark text-center tracking-tight">
                Olympiacos FC Stats Dashboard
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Previous Match */}
                {info.previousMatch && (
                    <div className="flex flex-col items-center lg:items-start">
                        <span className="px-5 py-2 bg-oly-red-dark text-white font-semibold rounded-full mb-4 shadow text-sm uppercase tracking-wide">
                            Latest Match
                        </span>
                        <MatchBasicCard match={info.previousMatch} />
                    </div>
                )}

                {/* Competitions */}
                <CompetitionsStatusCard competitions={info.competitionsStatus} />

                {/* Next Match */}
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

            {/*Stat Leaders*/}
            <div className="bg-gray-50 py-8 px-6 rounded-3xl shadow-inner">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
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
        </div>
    );
};

export default HomePage;
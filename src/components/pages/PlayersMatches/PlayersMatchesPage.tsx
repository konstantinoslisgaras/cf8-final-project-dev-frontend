import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api";
import PlayersMatchesPitchCard from "../../cards/PlayersMatches/PlayersMatchesPitchCard.tsx";
import PlayersMatchesTeamStatsCard from "../../cards/PlayersMatches/PlayersMatchesTeamStatsCard.tsx";
import PlayersMatchesSubstitutesCard from "../../cards/PlayersMatches/PlayersMatchesSubstitutesCard.tsx";
import PlayersMatchesInfoCard from "../../cards/PlayersMatches/PlayersMatchesInfoCard.tsx";
import type { PlayerMatchesPitchCardProps } from "../../../types/types";
import PlayersMatchesHeaderCard from "../../cards/PlayersMatches/PlayersMatchesHeaderCard.tsx";
import axiosClient from "../../../api/axiosClient.ts";

const PlayersMatchesPage = () => {
    const { matchId } = useParams<{ matchId: string }>();
    const [matchData, setMatchData] = useState<PlayerMatchesPitchCardProps["matchData"] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMatch = async () => {
            try {
                const { data } = await axiosClient.get(`${API_URL}/matches/detailed/${matchId}`);
                setMatchData(data);
                document.title = `${data.id}`;
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (matchId) loadMatch();
    }, [matchId]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-40">
                <p>Loading match data...</p>
            </div>
        );

    if (!matchData)
        return (
            <div className="flex justify-center items-center min-h-40">
                <p className="text-red-600">Match not found.</p>
            </div>
        );

    return (
        <div className="w-full min-h-screen bg-slate-50 p-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <PlayersMatchesHeaderCard matchData={matchData} />
            </div>

            {/* Layout */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 items-center lg:items-start text-center mb-12">
                {/* Left column */}
                <div className="lg:w-[30%] w-full space-y-5 flex flex-col items-center">
                    <PlayersMatchesInfoCard
                        description={matchData.description}
                        competition={matchData.competition}
                        season={matchData.season}
                        ground={matchData.ground}
                        date={matchData.date}
                        time={matchData.time}
                        day={matchData.day}
                        matchNumber={matchData.matchNumber}
                        coachName={matchData.coachName}
                    />
                    <PlayersMatchesTeamStatsCard stats={matchData.teamStatsDTO} />
                </div>

                {/* Right column */}
                <div className="lg:w-[70%] w-full flex flex-col gap-5">
                    <PlayersMatchesPitchCard matchData={matchData} />
                    <PlayersMatchesSubstitutesCard substitutes={matchData.playerMatches.slice(11)} />
                </div>
            </div>
        </div>
    );
};

export default PlayersMatchesPage;

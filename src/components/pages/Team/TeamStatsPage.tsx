import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api.ts";
import type { TeamStatsProps } from "../../../types/types.ts";
import TeamStatsCard from "../../cards/TeamStats/TeamStatsCard.tsx";
import axiosClient from "../../../api/axiosClient.ts";

const TeamStatsPage =() => {
    const { teamStatsId } = useParams<{ teamStatsId: string }>();
    const [teamStats, setTeamStats] = useState<TeamStatsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosClient.get(`${API_URL}/statistics/team/${teamStatsId}`);
                setTeamStats(data);
                document.title = `Olympiacos FC Stats`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (teamStatsId) {
            // noinspection JSIgnoredPromiseFromCall
            fetchStats();
        }
    }, [teamStatsId]);

    if (loading) return <p className="text-center mt-10">Loading team stats...</p>;
    if (!teamStats) return <p className="text-center mt-10 text-gray-600">No stats found.</p>;

    return(
        <>
            <div className="container mx-auto mb-20">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8 mt-6">
                    Team Statistics
                </h1>
                <div className="flex justify-center">
                    <TeamStatsCard teamStats={teamStats} />
                </div>
            </div>
        </>
    )
};

export default TeamStatsPage;
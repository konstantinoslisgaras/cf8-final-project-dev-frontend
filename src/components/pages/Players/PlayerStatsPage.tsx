import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api.ts";
import type { PlayerStatsProps } from "../../../types/types.ts";
import PlayerStatsCard from "../../PlayerStatsCard.tsx";

const PlayerStatsPage =() => {
    const { playerId } = useParams<{ playerId: string }>();
    const [playerStats, setPlayerStats] = useState<PlayerStatsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/statistics/players/${playerId}`);
                const data = await response.json();
                setPlayerStats(data);
                document.title = `${data.name} Stats`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (playerId) {
            // noinspection JSIgnoredPromiseFromCall
            fetchStats();
        }
    }, [playerId]);

    if (loading) return <p className="text-center mt-10">Loading player stats...</p>;
    if (!playerStats) return <p className="text-center mt-10 text-gray-600">No stats found.</p>;

    return(
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Player Statistics
                </h1>
                <div className="flex justify-center">
                    <PlayerStatsCard stats={playerStats} />
                </div>
            </div>
        </>
    )
};

export default PlayerStatsPage;
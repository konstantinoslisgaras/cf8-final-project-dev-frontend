import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api.ts";
import type { PlayerProps, CoachProps } from "../../../types/types.ts";
import PlayerCard from "../../PlayerCard.tsx";
import CoachCard from "../../CoachCard.tsx";

interface FullTeamData {
    players: PlayerProps[];
    coach: CoachProps;
}

const FullTeamPage =() => {
    const [team, setTeam] = useState<FullTeamData | null>(null);

    useEffect(() => {
        document.title = "FullTeam";

        fetchTeam()
            .then((data) => setTeam(data))
            .catch(console.error);
    }, []);

    const fetchTeam = async () => {
        const response = await fetch(`${API_URL}/players/fullteam`);
        if (!response.ok) throw new Error("Error: Failed to load team.");
        return response.json();
    };

    if (!team) return <p className="text-center mt-10">Loading...</p>;

    const positionGroups = {
        Goalkeepers: team.players.filter(p => p.genericPosition === "Goalkeeper"),
        Defenders: team.players.filter(p => p.genericPosition === "Defender"),
        Midfielders: team.players.filter(p => p.genericPosition === "Midfielder"),
        Attackers: team.players.filter(p => p.genericPosition === "Attacker")
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Olympiacos Full Team
                </h1>
                {/* Players */}
                {Object.entries(positionGroups).map(([genericPosition, players]) => (
                    <div key={genericPosition} className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-oly-red-dark pb-1">
                            {genericPosition}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {players.map((player) => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </div>
                ))}
                {/* Coach */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-oly-red-dark pb-1">
                        Coach
                    </h2>
                    <div id="bottom" className="flex justify-center mb-8">
                        <CoachCard coach={team.coach}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullTeamPage;
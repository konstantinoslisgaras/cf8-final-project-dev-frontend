import { useEffect, useState } from "react";
import type { MatchDetailedProps } from "../../../types/types.ts";
import { API_URL } from "../../../config/api.ts";
import MatchDetailedCard from "../../cards/Matches/MatchDetailedCard.tsx";
import {useScrollMemory} from "../../../hooks/useScrollMemory.ts";
import axiosClient from "../../../api/axiosClient.ts";

const MatchesDetailedPage =() => {
    const [matchesDetailed, setMatchesDetailed] = useState<MatchDetailedProps[]>([]);

    useScrollMemory();

    useEffect(() => {
        document.title = "Detailed";

        fetchMatches()
            .then((matchData) => setMatchesDetailed(matchData))
            .catch(console.error);
    }, []);

    const fetchMatches = async () => {
        const response = await axiosClient.get(`${API_URL}/matches/detailed`);
        if (!response) throw new Error("Error: Failed to load matches.");
        return response.data;
    };

    return (
        <>
            <div className="container mx-auto p-6 mb-10">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Olympiacos FC Matches Results
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 mb-8 justify-items-center">
                    {matchesDetailed.map(matchDetailed => (
                        <MatchDetailedCard key={matchDetailed.id} match={matchDetailed} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MatchesDetailedPage;
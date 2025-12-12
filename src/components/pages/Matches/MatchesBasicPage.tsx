import { useEffect, useState } from "react";
import type { MatchBasicProps } from "../../../types/types.ts";
import { API_URL } from "../../../config/api.ts";
import MatchBasicCard from "../../cards/Matches/MatchBasicCard.tsx";
import axiosClient from "../../../api/axiosClient.ts";

const MatchesBasicPage =() => {
    const [matchesBasic, setMatchesBasic] = useState<MatchBasicProps[]>([]);

    useEffect(() => {
        document.title = "Program";

        fetchMatches()
            .then((matchData) => setMatchesBasic(matchData))
            .catch(console.error);
    }, []);

    const fetchMatches = async () => {
        const response = await axiosClient.get(`${API_URL}/matches/schedule`);
        if (!response) throw new Error("Error: Failed to load matches.");
        return response.data;
    };

    return (
        <>
            <div className="container mx-auto p-6 mb-10">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Olympiacos FC Matches Program
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 mb-8 justify-items-center">
                    {matchesBasic.map(matchBasic => (
                        <MatchBasicCard key={matchBasic.id} match={matchBasic} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MatchesBasicPage;
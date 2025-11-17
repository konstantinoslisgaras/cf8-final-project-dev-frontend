import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api.ts";
import type { CompetitionProps } from "../../../types/types.ts";
import CompetitionCard from "../../CompetitionCard.tsx";

const CompetitionPage = () => {
    const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/competitions`);
                const data = await response.json();
                setCompetitions(data);
            } catch (error) {
                console.error("Failed to load competitions:", error);
            } finally {
                setLoading(false);
            }
        };
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading competitions...</p>;
    if (!competitions.length) return <p className="text-center mt-10 text-gray-600">No competitions found.</p>;

    return (
        <div className="container mx-auto mb-16">
            <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8 mt-6">
                Team Statistics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {competitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                ))}
            </div>
        </div>
    );
};

export default CompetitionPage;

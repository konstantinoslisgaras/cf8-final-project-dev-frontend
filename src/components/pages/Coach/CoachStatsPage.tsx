import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api.ts";
import type { CoachStatsProps } from "../../../types/types.ts";
import CoachStatsCard from "../../CoachStatsCard.tsx";

const CoachStatsPage =() => {
    const { coachId } = useParams<{ coachId: string }>();
    const [coachStats, setCoachStats] = useState<CoachStatsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/statistics/coach/${coachId}`);
                const data = await response.json();
                setCoachStats(data);
                document.title = `${data.name} Stats`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (coachId) {
            // noinspection JSIgnoredPromiseFromCall
            fetchStats();
        }
    }, [coachId]);

    if (loading) return <p className="text-center mt-10">Loading coach stats...</p>;
    if (!coachStats) return <p className="text-center mt-10 text-gray-600">No stats found.</p>;

    return(
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center text-oly-red-dark mb-8">
                    Coach Statistics
                </h1>
                <div className="flex justify-center">
                    <CoachStatsCard stats={coachStats} />
                </div>
            </div>
        </>
    )
};

export default CoachStatsPage;
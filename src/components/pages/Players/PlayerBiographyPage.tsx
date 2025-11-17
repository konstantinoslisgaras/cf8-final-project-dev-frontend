import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../../config/api.ts";
import type { BiographyProps } from "../../../types/types.ts";
import BiographyCard from "../../BiographyCard.tsx";

const PlayerBiographyPage = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const { detailedBioId } = useParams<{ detailedBioId: string }>();
    const [bio, setBio] = useState<BiographyProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const response = await fetch(`${API_URL}/players/${playerId}/${detailedBioId}`);
                const data = await response.json();
                setBio(data);
                document.title = `${data.fullname} | Biography`;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (playerId) fetchBio();
    }, [playerId, detailedBioId]);

    if (loading) return <p className="text-center mt-10">Loading biography...</p>;
    if (!bio) return <p className="text-center mt-10 text-red-500">Biography not found.</p>;

    return (
        <div className="container mx-auto p-6">
            <BiographyCard bio={bio} />
        </div>
    );
};

export default PlayerBiographyPage;

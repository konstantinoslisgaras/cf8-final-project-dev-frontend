import {useEffect, useState} from "react";
import type { HistoryProps } from "../../../types/types.ts";
import { API_URL } from "../../../config/api.ts";
import HistoryCard from "../../HistoryCard.tsx";

const HistoryPage = () => {

    const [info, setInfo] = useState<HistoryProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/history`);
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.error("Failed to load Olympiacos info: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (!info) return <p>Failed to load history...</p>;

    return (
        <HistoryCard olympiacosHistory={info} />
    )
}

export default HistoryPage;
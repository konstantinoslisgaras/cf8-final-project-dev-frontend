import { Footprints, TicketSlash, TicketX } from "lucide-react";
import type { PlayerMatchesPitchCardProps } from "../types/types.ts";
import type {JSX} from "react";

interface TeamStatsMiniRowProps {
    stats: PlayerMatchesPitchCardProps["matchData"]["teamStatsDTO"];
}

const PlayersMatchesTeamStatsCard = ({ stats }: TeamStatsMiniRowProps) => {
    const box = (icon: JSX.Element, value: number) => (
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-[2px] shadow-sm text-[11px] hover:bg-gray-100 hover:shadow-lg">
            <div>{icon}</div>
            <span className="font-semibold text-xl">{value}</span>
        </div>
    );

    return (
        <div className="flex justify-center gap-2 mt-2">
            {box(<Footprints className="w-10 h-10" />, stats.assists)}
            {box(<TicketSlash className="w-10 h-10 text-yellow-500" />, stats.yellowCards)}
            {box(<TicketX className="w-10 h-10 text-red-600" />, stats.redCards)}
        </div>
    );
};

export default PlayersMatchesTeamStatsCard;

import type { PlayerMatchesPitchCardProps } from "../types/types";

interface PlayersMatchesHeaderProps {
    matchData: PlayerMatchesPitchCardProps["matchData"];
}

const PlayersMatchesHeaderCard = ({ matchData }: PlayersMatchesHeaderProps) => {
    // Determine if Olympiacos is home or away
    const isOlympiacosHome = matchData.ground?.toLowerCase() === "home";

    const leftTeam = isOlympiacosHome ? matchData.olympiacosName : matchData.opponentName;
    const leftScore = isOlympiacosHome ? matchData.olympiacosGoals : matchData.opponentGoals;
    const leftColor = isOlympiacosHome ? "text-oly-red" : "text-slate-700";

    const rightTeam = isOlympiacosHome ? matchData.opponentName : matchData.olympiacosName;
    const rightScore = isOlympiacosHome ? matchData.opponentGoals : matchData.olympiacosGoals;
    const rightColor = isOlympiacosHome ? "text-slate-700" : "text-oly-red";

    // Determine result color
    const getResultColor = () => {
        if (matchData.result?.toLowerCase().includes('win')) return 'bg-green-500';
        if (matchData.result?.toLowerCase().includes('draw')) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const resultColor = getResultColor();

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between gap-6">
                {/* Left Team (Home) */}
                <div className="text-center flex-1">
                    <h1 className={`text-2xl font-bold truncate ${leftColor}`}>
                        {leftTeam}
                    </h1>
                    <div className={`text-3xl font-bold mt-2 ${leftColor}`}>
                        {leftScore}
                    </div>
                </div>

                {/* Score Separator */}
                <div className="flex flex-col items-center">
                    <div className="text-2xl text-slate-500 font-bold">VS</div>
                    <div className={`text-white px-4 py-2 rounded-lg ${resultColor} mt-2`}>
                        <div className="text-sm font-semibold whitespace-nowrap">
                            {matchData.result}
                        </div>
                    </div>
                </div>

                {/* Right Team (Away) */}
                <div className="text-center flex-1">
                    <h2 className={`text-2xl font-bold truncate ${rightColor}`}>
                        {rightTeam}
                    </h2>
                    <div className={`text-3xl font-bold mt-2 ${rightColor}`}>
                        {rightScore}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayersMatchesHeaderCard;
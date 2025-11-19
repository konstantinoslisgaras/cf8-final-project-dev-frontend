import type { PlayerMatchesPitchCardProps } from "../types/types.ts";

interface SubstitutesRowProps {
    substitutes: PlayerMatchesPitchCardProps["matchData"]["playerMatches"];
}

const PlayersMatchesSubstitutesCard = ({ substitutes }: SubstitutesRowProps) => {
    if (!substitutes || substitutes.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-x-auto mb-20">
            {/* Header */}
            <h2 className="text-base font-semibold text-center uppercase tracking-wide mb-4 pb-2 border-b border-gray-200 text-[color:var(--color-oly-red)]">
                Substitutes
            </h2>

            <div className="flex justify-center gap-1 min-w-max px-2">
                {substitutes.map((p) => {
                    // Build the stats string
                    const stats: string[] = [];

                    // Minutes played first
                    if (p.minutesPlayed > 0) {
                        stats.push(`${p.minutesPlayed}'`);
                    }

                    // Goals
                    if (p.goals > 0) {
                        stats.push(`⚽${p.goals > 1 ? `×${p.goals}` : ''}`);
                    }

                    // Assists
                    if (p.assists > 0) {
                        stats.push(`👟${p.assists > 1 ? `×${p.assists}` : ''}`);
                    }

                    // Yellow / Red cards
                    if (p.yellowCards > 0) {
                        stats.push(`🟨${p.yellowCards > 1 ? `×${p.yellowCards}` : ''}`);
                    }
                    if (p.redCards > 0) {
                        stats.push(`🟥`);
                    }

                    return (
                        <div
                            key={p.id}
                            className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg shadow-xs py-2 px-3 min-w-[85px] hover:shadow-md transition-all"
                        >
                            {/* Shirt number bubble */}
                            <div className="w-7 h-7 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold mb-1">
                                {p.shirtNumber}
                            </div>

                            {/* Name */}
                            <p className="text-[13px] font-semibold text-gray-900 leading-tight text-center">
                                {p.player}
                            </p>

                            {/* Stats: minutes, goals, assists, cards */}
                            {stats.length > 0 && (
                                <p className="text-[11px] text-gray-500 mt-[2px] text-center">
                                    {stats.join(' ')}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayersMatchesSubstitutesCard;

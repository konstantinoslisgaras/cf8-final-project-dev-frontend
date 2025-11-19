import SoccerLineUp, { type Player, type Team } from "react-soccer-lineup";

interface PlayerMatch {
    id: string;
    player: string;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    goalsConceded: number;
    minutesPlayed: number;
    shirtNumber: number;
}

interface MatchData {
    playerMatches: PlayerMatch[];
}

interface Props {
    matchData: MatchData;
}

const PlayersMatchesPitchCard = ({ matchData }: Props) => {
    const startingXI = matchData.playerMatches.slice(0, 11);

    // Find max minutes in the starting XI (usually 90 or 120 for extra time)
    const maxMinutes = Math.max(...startingXI.map(p => p.minutesPlayed));

    const mapPlayer = (p: PlayerMatch): Player => {
        const stats = [];

        if (p.goals > 0) {
            stats.push(`⚽${p.goals > 1 ? `×${p.goals}` : ''}`);
        }
        if (p.assists > 0) {
            stats.push(`👟${p.assists > 1 ? `×${p.assists}` : ''}`);
        }
        if (p.yellowCards > 0) {
            stats.push(`🟨${p.yellowCards > 1 ? `×${p.yellowCards}` : ''}`);
        }
        if (p.redCards > 0) {
            stats.push(`🟥`);
        }

        if (p.goalsConceded > 0) {
            stats.push(`🥅×${p.goalsConceded}`); // Goal net emoji
        }

        // Add recycle icon if player was substituted AND doesn't have a red card
        const wasSubstituted = p.minutesPlayed < maxMinutes && p.redCards === 0;
        if (wasSubstituted) {
            stats.push(`⬇️`);
        }

        if (wasSubstituted) {
            stats.push(`${p.minutesPlayed}′`); // e.g., (31′)
        }

        return {
            name: stats.length > 0 ? `${p.player} ${stats.join('')}` : p.player,
            number: p.shirtNumber,
            style: {
                color: "#c30000",
            },
        };
    };

    const homeTeam: Team = {
        squad: {
            gk: { ...mapPlayer(startingXI[0]), offset: { x: -15, y: 0 } },
            df: [
                { ...mapPlayer(startingXI[1]), offset: { x: 0, y: 0 } },
                { ...mapPlayer(startingXI[2]), offset: { x: 0, y: 0 } },
                { ...mapPlayer(startingXI[3]), offset: { x: 0, y: 0 } },
                { ...mapPlayer(startingXI[4]), offset: { x: 0, y: 0 } }
            ],
            cdm: [
                { ...mapPlayer(startingXI[5]), offset: { x: -5, y: -25 } },
                { ...mapPlayer(startingXI[6]), offset: { x: 25, y: 25 } }
            ],
            cam: [
                { ...mapPlayer(startingXI[7]), offset: { x: 10, y: 10 } },
                { ...mapPlayer(startingXI[8]), offset: { x: 35, y: 0 } },
                { ...mapPlayer(startingXI[9]), offset: { x: 10, y: -10 } }
            ],
            fw: [
                { ...mapPlayer(startingXI[10]), offset: { x: 40, y: 0 } }
            ],
        },
        style: {
            color: "#2f6b3b",
            borderColor: "#fff",
            numberColor: "#fff",
            nameColor: "#fff",
            nameBackgroundColor: "#00000090",
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-2">
            {/* Header */}
            <h2 className="text-base font-semibold text-center uppercase tracking-wide mb-4 pb-2 border-b border-gray-200 text-[color:var(--color-oly-red)]">
                Starting XI
            </h2>

            {/* Pitch */}
            <div className="w-full max-w-4xl mx-auto flex justify-center">
                <SoccerLineUp
                    color="#3A7D44"
                    size="responsive"
                    pattern="lines"
                    homeTeam={homeTeam}
                />
            </div>
        </div>
    );
};

export default PlayersMatchesPitchCard;
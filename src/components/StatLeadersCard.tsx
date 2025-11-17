import { Card, CardHeader, CardContent } from './ui/card';
import {
    Trophy,
    Footprints,
    Clock,
    Calendar,
    ChevronRight,
    Volleyball,
    TicketSlash,
    TicketX
} from 'lucide-react';
import * as React from 'react';

interface PlayerStat {
    playerId: string;
    name: string;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    wins?: number;
    minutesPlayed?: number;
    matchesPlayed?: number;
}

interface StatLeaderCardProps {
    title: string;
    leaders?: PlayerStat[] | PlayerStat;
    statKey: 'goals' | 'assists' | 'yellowCards' | 'redCards' | 'wins' | 'minutesPlayed' | 'matchesPlayed';
}

const StatLeadersCard: React.FC<StatLeaderCardProps> = ({ title, leaders, statKey }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    if (!leaders) return null;

    const items = Array.isArray(leaders) ? leaders : [leaders];
    const hasMultiple = items.length > 1;

    const getStatValue = (player: PlayerStat) => player[statKey] ?? 0;

    const getIcon = () => {
        switch (statKey) {
            case 'goals': return <Volleyball className="w-6 h-6 text-yellow-600" />;
            case 'assists': return <Footprints className="w-6 h-6 text-blue-500" />;
            case 'wins': return <Trophy className="w-6 h-6 text-green-500" />;
            case 'minutesPlayed': return <Clock className="w-6 h-6 text-purple-500" />;
            case 'matchesPlayed': return <Calendar className="w-6 h-6 text-indigo-500" />;
            case 'yellowCards': return <TicketSlash className="w-6 h-6 text-orange-400" />;
            case 'redCards': return <TicketX className="w-6 h-6 text-red-400" />;
            default: return null;
        }
    };

    const getStatLabel = () => {
        switch (statKey) {
            case 'goals': return 'goals';
            case 'assists': return 'assists';
            case 'wins': return 'wins';
            case 'minutesPlayed': return 'mins';
            case 'matchesPlayed': return 'matches';
            case 'yellowCards': return 'yellow cards';
            case 'redCards': return 'red cards';
            default: return '';
        }
    };

    const FrontContent = () => (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="mb-4">{getIcon()}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2 truncate w-full">{items[0].name}</div>
            <div className="text-xl font-semibold text-oly-red-dark mb-3">
                {getStatValue(items[0])} {getStatLabel()}
            </div>
            <div className="text-sm text-gray-500">{title}</div>
            {hasMultiple && (
                <div className="flex items-center gap-1 mt-4 text-xs text-gray-400 justify-center">
                    <span>View top {items.length}</span>
                    <ChevronRight className="w-3 h-3" />
                </div>
            )}
        </div>
    );

    const BackContent = () => {
        const totalPlayers = items.length;
        const rowHeight = `${Math.floor(100 / totalPlayers)}%`;

        return (
            <div className="h-full flex flex-col p-6">
                <div className="text-center mb-4">
                    {getIcon()}
                    <h3 className="text-sm font-semibold text-gray-700 mt-2">
                        Top {items.length} {title}
                    </h3>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    {items.map((player, idx) => (
                        <div
                            key={player.playerId}
                            className="flex justify-between items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            style={{ height: rowHeight }}
                        >
                            <div className="flex items-center gap-3 truncate">
                                <span className="text-sm font-medium text-gray-500 w-6">{idx + 1}.</span>
                                <span className="text-sm font-medium text-gray-800 truncate">{player.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-oly-red-dark">
                                {getStatValue(player)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-xs text-gray-400 justify-center">
                    <span>Back to summary</span>
                    <ChevronRight className="w-3 h-3 rotate-180" />
                </div>
            </div>
        );
    };

    return (
        <div
            className="w-full h-full cursor-pointer perspective-1000"
            onClick={() => hasMultiple && setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                    <Card className="w-full h-full bg-white/90 shadow-lg hover:shadow-xl transition-all rounded-2xl border border-gray-200">
                        <CardHeader className="bg-gradient-to-r from-oly-red-dark to-oly-red text-white rounded-t-2xl py-3 text-center">
                            <h2 className="font-bold text-sm">{title}</h2>
                        </CardHeader>
                        <CardContent className="p-0 h-[calc(100%-3.5rem)]">
                            <FrontContent />
                        </CardContent>
                    </Card>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-white/90 shadow-lg hover:shadow-xl transition-all rounded-2xl border border-gray-200">
                        <CardHeader className="bg-gradient-to-r from-oly-red to-oly-red-dark text-white rounded-t-2xl py-3 text-center">
                            <h2 className="font-bold text-sm">Top {items.length} {title}</h2>
                        </CardHeader>
                        <CardContent className="p-0 h-[calc(100%-3.5rem)]">
                            <BackContent />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StatLeadersCard;
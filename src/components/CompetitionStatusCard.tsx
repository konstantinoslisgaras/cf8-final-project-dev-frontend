import type { CompetitionProps } from "../types/types.ts";

type CompetitionsStatusProps = {
    competitions: CompetitionProps[] | undefined;
};

const CompetitionsStatusCard = ({ competitions }: CompetitionsStatusProps) => {
    return (
        <div className="flex flex-col items-center">
            <span className="px-5 py-2 bg-blue-800 text-white font-semibold rounded-full mb-4 shadow text-sm uppercase tracking-wide">
                Competitions
            </span>

            <div className="w-full space-y-2">
                {competitions?.length ? (
                    competitions.map((comp) => (
                        <div
                            key={comp.id}
                            className="flex justify-between items-center bg-white border border-gray-200 shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow"
                        >
                            <div>
                                <p className="font-semibold text-gray-900 text-lg">
                                    {comp.competitionName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Position:{" "}
                                    <span className="font-semibold text-oly-red-dark">
                                        {comp.competitionPosition}
                                    </span>
                                </p>
                            </div>

                            <span className="text-xl font-bold text-oly-red-dark">
                                {comp.competitionPoints} pts
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        Competition data coming soon...
                    </p>
                )}
            </div>
        </div>
    );
};

export default CompetitionsStatusCard;

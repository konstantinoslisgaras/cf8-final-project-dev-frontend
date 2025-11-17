import type { JSX } from "react";
import type { BiographyProps } from "../types/types.ts";
import { Card, CardHeader, CardContent } from "./ui/card";
import { BookOpenText, CalendarDays, FileClock, Globe, MapPinHouse, RulerDimensionLine } from "lucide-react";

export interface BiographyCardProps {
    bio: BiographyProps;
}

const statRow = (icon: JSX.Element, label: string, value: string | number) => (
    <div className="flex items-center gap-2 text-gray-700">
        {icon}
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
    </div>
);

const BiographyCard = ({ bio }: BiographyCardProps) => {
    const { fullname, birthdate, cityOfBirth, secondNationality, height, previousTeam, biography } = bio;

    return (
        <Card className="w-full max-w-4xl bg-white shadow-md rounded-2xl border border-gray-200 mx-auto">
            <CardHeader className="bg-oly-red-dark text-white rounded-t-2xl py-4 text-center">
                <h2 className="text-2xl font-bold">{fullname}</h2>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
                {statRow(<CalendarDays className="w-5 h-5 text-oly-red-dark" />, "Birthdate", birthdate)}
                {statRow(<MapPinHouse className="w-5 h-5 text-oly-red-dark" />, "City of Birth", cityOfBirth)}
                {secondNationality &&
                    statRow(<Globe className="w-5 h-5 text-oly-red-dark" />, "Second Nationality", secondNationality)}
                {statRow(<RulerDimensionLine className="w-5 h-5 text-oly-red-dark rotate-90" />, "Height", `${height} m`)}
                {statRow(<FileClock className="w-5 h-5 text-oly-red-dark" />, "Previous Team", previousTeam)}

                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpenText className="w-5 h-5 text-oly-red-dark" />
                        <span className="text-lg font-semibold text-gray-900">Biography</span>
                    </div>
                    <p className="text-gray-800 text-justify leading-relaxed">
                        {biography}
                    </p>
                </div>
            </CardContent>
        </Card>

    );
};

export default BiographyCard;

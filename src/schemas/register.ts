import { z } from "zod";

const today = new Date();
const minDate = new Date();
minDate.setFullYear(today.getFullYear() - 120);

export const registerSchema = z.object({
    username: z
        .string()
        .min(3)
        .max(20)
        .regex(/^(?!.*(?:admin|administrator))[A-Za-z0-9_]+$/i, {
            message:
                "Username can only contain latin letters, numbers and underscores, and cannot contain 'admin' or 'administrator'.",
        }),

    password: z
        .string()
        .min(8,
            { message: "Password must be at least 8 characters long." })
        .max(30,
            { message: "Password cannot exceed 30 characters." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&*]).{8,}$/,
            {
                message:
                    "Password must include an uppercase, a lowercase, a number, and a special character and must be at least 8 characters long.",
            }),

    firstname: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(30, { message: "First name cannot exceed 30 characters." }),

    lastname: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(30, { message: "Last name cannot exceed 30 characters." }),

    email: z
        .string({ message: "Please enter a valid email address (must include a '@' and a domain end)." })
        .max(100, { message: "Email cannot exceed 100 characters." }),

    dateOfBirth: z.string()
        .refine((val) => {
            if (!val) return true;
            const date = new Date(val);
            return date >= minDate && date <= today;
        }, "Date of birth must be in the past and within the last 120 years")
        .optional(),

    genderType: z
        .enum(["PREFER_NOT_TO_DISCLOSE", "MALE", "FEMALE", "OTHER"], {
            message: "Please select a gender."
        }),

    favoriteLegend: z
        .string()
        .max(100, { message: "Favorite legend name is too long." })
        .optional(),

    supportedPlayerId: z
        .string()
        .min(1, { message: "Please select a player." }),

    olympiacosFan: z
        .boolean({ message: "Please select a gender."
        })
});

export type RegisterFields = z.infer<typeof registerSchema>;
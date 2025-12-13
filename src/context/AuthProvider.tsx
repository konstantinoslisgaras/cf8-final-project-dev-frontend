import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginFields } from "../schemas/login";
import { login } from "../services/api.login";
import type { UserDTO } from "../types/types.ts";
import { API_URL } from "../config/api.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (token) setAccessToken(token);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false);
    }, []);

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);
        const token = res.token;
        setAccessToken(token);
        localStorage.setItem("access_token", token);

        const profileRes = await fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (!profileRes.ok) {
            logoutUser();
            throw new Error("Failed to load user profile");
        }

        const me: UserDTO = await profileRes.json();
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setAccessToken(null);
        setUser(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-oly-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your Olympiacos FC experience...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!accessToken,
                accessToken,
                loginUser,
                logoutUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

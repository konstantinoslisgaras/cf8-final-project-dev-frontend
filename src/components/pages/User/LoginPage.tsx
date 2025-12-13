import React, { useState } from "react";
import LoginCard from "../../cards/User/LoginCard.tsx";
import { useAuth} from "../../../hooks/useAuth.ts";
import {useNavigate} from "react-router";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async ({ username, password }: { username: string; password: string }) => {
        setLoading(true);
        setError("");

        try {
            await loginUser({ username, password });
            navigate("/history");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Invalid username or password";
            setError(message);
            setTimeout(() => setError(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
            style={{
                background: "linear-gradient(120deg, #db4439 0%, #cf3a60 60%, #c30000 100%)"
            }}
        >
            <div className="w-full max-w-sm">
                <LoginCard onLogin={handleLogin} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default LoginPage;
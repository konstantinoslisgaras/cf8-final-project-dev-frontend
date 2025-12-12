import { Link } from "react-router";
import logo from "../../assets/olympiacos-fc-stats-logo.png";
import { LogoutButton } from "../cards/User/LogoutButton.tsx";
import { useContext, useState, type ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext.ts";

interface DropdownProps {
    label: string;
    children: ReactNode;
}

const Dropdown = ({ label, children }: DropdownProps) => (
    <div className="relative group text-white">
        <button className="flex items-center gap-1 font-semibold text-lg px-3 py-2 hover:text-gray-100 transition">
            {label}
            <span className="text-xs opacity-70">▾</span>
        </button>

        {/* Modern dropdown – dark, centered, smooth */}
        <div className="
            absolute left-1/2 -translate-x-1/2 mt-3 w-32
            bg-oly-red-dark backdrop-blur-md border border-white/100
            shadow-xl rounded-sm overflow-hidden
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-400 z-50
        ">
            <ul className="text-white text-center text-base font-medium divide-y divide-white/25">
                {children}
            </ul>
        </div>
    </div>
);

const Header = () => {
    const auth = useContext(AuthContext)!;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleMobileLinkClick = () => setMobileMenuOpen(false);

    if (!auth || auth.loading) return null;

    const navItems = (
        <>
            {/* === NO DROPDOWN — ORIGINAL STYLE KEPT === */}
            <li>
                <Link to="/homepage" className="block px-4 py-2 hover:opacity-80" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined}
                >
                    HomePage
                </Link>
            </li>

            {/* === NO DROPDOWN — ORIGINAL === */}
            <li>
                <Link to="/statistics/team/TS20252026" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined}
                      className="block px-4 py-2 hover:opacity-80">
                    TeamStats
                </Link>
            </li>

            {/* === DROPDOWN: FULLTEAM === */}
            <li>
                <Dropdown label="Team">
                    <li>
                        <Link to="/players/fullteam" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            Players
                        </Link>
                    </li>
                    <li>
                        <Link to="/players/fullteam#bottom" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            Coach
                        </Link>
                    </li>
                </Dropdown>
            </li>

            {/* === DROPDOWN: MATCHES === */}
            <li>
                <Dropdown label="Matches">
                    <li>
                        <Link to="/matches/schedule" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            Program
                        </Link>
                    </li>
                    <li>
                        <Link to="/matches/detailed" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            Results
                        </Link>
                    </li>
                </Dropdown>
            </li>

            <li>
                <Dropdown label="Information">
                    <li>
                        <Link to="/competitions" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            Competitions
                        </Link>
                    </li>
                    <li>
                        <Link to="/history" onClick={mobileMenuOpen ? handleMobileLinkClick : undefined} className="block px-4 py-2 hover:bg-white/10">
                            History
                        </Link>
                    </li>
                </Dropdown>
            </li>
        </>
    );

    return (
        <header className="bg-oly-red-dark w-full fixed z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

                {/* Logo */}
                <Link to="/homepage" className="flex items-center">
                    <img className="my-2 h-16 w-auto" src={logo} alt="Olympiacos FC Stats Logo" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex items-center space-x-8 text-white font-semibold text-lg">
                        {navItems}
                    </ul>
                </nav>

                {/* Profile + Logout + Burger */}
                <div className="flex items-center space-x-4">

                    {/* Updated slightly – still matches your style */}
                    <Link
                        to="/profile"
                        className="
                          text-white font-semibold text-lg px-4 py-2
                          bg-white/10 backdrop-blur-md rounded-md
                          hover:bg-white/20 transition
                        "
                    >
                        {auth.user ? `${auth.user.firstname}'s Profile` : "Profile"}
                    </Link>

                    <LogoutButton />

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-white text-3xl ml-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-oly-red-dark w-full shadow-md border-t border-white/10">
                    <ul className="flex flex-col items-center space-y-4 py-6 text-white font-semibold text-lg">
                        {navItems}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;

import { Link } from "react-router";
import logo from "../../assets/olympiacos-fc-stats-logo.png";
import { LogoutButton } from "../cards/User/LogoutButton.tsx";
import { useContext, useState, type ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext.ts";
import { Menu, X } from "lucide-react";

interface DropdownProps {
    label: string;
    children: ReactNode;
    mobile?: boolean;
}

const Dropdown = ({ label, children, mobile }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    // Only toggle on mobile, desktop still uses hover
    const toggle = () => {
        if (mobile) setOpen((prev) => !prev);
    };

    return (
        <div className={`relative ${mobile ? "" : "group"}`}>
            <button
                className="flex items-center gap-1 font-semibold text-lg px-3 py-2 hover:text-gray-100 transition w-full text-left"
                onClick={toggle}
            >
                {label}
                <span className="text-xs opacity-70">▾</span>
            </button>

            <div
                className={`
                    absolute left-1/2 -translate-x-1/2 mt-3 w-32
                    bg-oly-red-dark backdrop-blur-md border border-white/100
                    shadow-xl rounded-sm overflow-hidden
                    transition-all duration-400 z-50
                    ${mobile ? (open ? "block" : "hidden") : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}
                `}
            >
                <ul className="text-white text-center text-base font-medium divide-y divide-white/25">
                    {children}
                </ul>
            </div>
        </div>
    );
};

const Header = () => {
    const auth = useContext(AuthContext)!;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleMobileLinkClick = () => setMobileMenuOpen(false);

    if (!auth || auth.loading) return null;

    const navItems = (
        <>
            <li>
                <Link
                    to="/homepage"
                    className="block px-4 py-2 hover:opacity-80"
                    onClick={mobileMenuOpen ? handleMobileLinkClick : undefined}
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    to="/statistics/team/TS20252026"
                    className="block px-4 py-2 hover:opacity-80"
                    onClick={mobileMenuOpen ? handleMobileLinkClick : undefined}
                >
                    Statistics
                </Link>
            </li>
            <li>
                <Dropdown label="Squad" mobile={mobileMenuOpen}>
                    <li>
                        <Link
                            to="/players/fullteam"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
                            Players
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/players/fullteam#bottom"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
                            Coach
                        </Link>
                    </li>
                </Dropdown>
            </li>
            <li>
                <Dropdown label="Matches" mobile={mobileMenuOpen}>
                    <li>
                        <Link
                            to="/matches/schedule"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
                            Upcoming
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/matches/detailed"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
                            Results
                        </Link>
                    </li>
                </Dropdown>
            </li>
            <li>
                <Dropdown label="About" mobile={mobileMenuOpen}>
                    <li>
                        <Link
                            to="/competitions"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
                            Competitions
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/history"
                            className="block px-4 py-2 hover:bg-white/10"
                            onClick={handleMobileLinkClick}
                        >
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

                    <button
                        className="lg:hidden text-white text-3xl ml-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-oly-red-dark w-full shadow-md border-t border-white/10">
                    <ul className="flex flex-col items-center space-y-4 py-6 text-white font-semibold text-lg">
                        {navItems}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
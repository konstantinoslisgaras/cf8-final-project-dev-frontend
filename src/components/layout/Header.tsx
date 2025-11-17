import { Link } from "react-router";
import logo from "../../assets/olympiacos-fc-stats-logo.png";

const Header =() => {
    return (
        <>
            <header className="bg-oly-red-dark w-full fixed z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
                    <Link to="/api/homepage" className="flex items-center">
                        <img className="my-2 h-16 w-auto" src={logo} alt="Olympiacos FC Stats Logo"/>
                    </Link>
                    <nav className="flex-2 flex justify-center">
                        <ul className="flex items-center space-x-8 text-white font-semibold text-lg">
                            <li>
                                <Link to="/api/players/fullteam">
                                    Players
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/players/fullteam#bottom">
                                    Coach
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/matches/schedule">
                                    Program
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/matches/detailed">
                                    Results
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/statistics/team/TS20252026">
                                    TeamStats
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/competitions">
                                    Competitions
                                </Link>
                            </li>
                            <li>
                                <Link to="/api/history">
                                    History
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;
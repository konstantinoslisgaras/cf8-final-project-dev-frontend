import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ScrollToHash} from "./components/utils/ScrollToHash.tsx";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage/HomePage.tsx";
import FullTeamPage from "./components/pages/Team/FullTeamPage.tsx";
import PlayerBiographyPage from "./components/pages/Players/PlayerBiographyPage.tsx";
import MatchesBasicPage from "./components/pages/Matches/MatchesBasicPage.tsx";
import MatchesDetailedPage from "./components/pages/Matches/MatchesDetailedPage.tsx";
import PlayersMatchesPage from "./components/pages/PlayersMatches/PlayersMatchesPage.tsx";
import HistoryPage from "./components/pages/History/HistoryPage.tsx";
import PlayerStatsPage from "./components/pages/Players/PlayerStatsPage.tsx";
import CoachBiographyPage from "./components/pages/Coach/CoachBiographyPage.tsx";
import CoachStatsPage from "./components/pages/Coach/CoachStatsPage.tsx";
import TeamStatsPage from "./components/pages/Team/TeamStatsPage.tsx";
import CompetitionPage from "./components/pages/Competitions/CompetitionsPage.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToHash />
                <Routes>
                    <Route element={<Layout />} >
                    <Route path="/api/homepage" element={<HomePage />} />

                    <Route path="/api/players">
                        <Route path="fullteam" element={<FullTeamPage />} />
                        <Route path=":playerId/:detailedBioId" element={<PlayerBiographyPage />} />
                    </Route>

                    <Route path="/api/coach/:coachId/:detailedBioId" element={<CoachBiographyPage />} />

                    <Route path="/api/matches">
                        <Route path="schedule" element={<MatchesBasicPage />} />
                        <Route path="detailed" element={<MatchesDetailedPage />} />
                        <Route path="detailed/:matchId" element={<PlayersMatchesPage />} />
                    </Route>

                    <Route path="/api/statistics">
                        <Route path="team/:teamStatsId" element={<TeamStatsPage />} />
                        <Route path="players/:playerId" element={<PlayerStatsPage />} />
                        <Route path="coach/:coachId" element={<CoachStatsPage />} />
                    </Route>

                    <Route path="/api/competitions" element={<CompetitionPage />} />

                    <Route path="/api/history" element={<HistoryPage />} />

                    <Route path="*" element={<h1>Page Not Found</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
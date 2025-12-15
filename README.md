# ⚽ Omicron Team Stats 📊 (frontend)

### A Simple Football Analytics Platform

OTS is a sophisticated, full-stack Java application designed to transform raw football data into actionable, winning strategies. Built for coaches, analysts, and fans who demand precision, this platform delivers real-time statistics, predictive analytics, and comprehensive match intelligence.

---

# 🎓 Project Origin
This application was developed as the Final Project for Coding Factory 8 at the Athens University of Economics and Business (AUEB). It serves as a comprehensive demonstration of expertise across modern enterprise architecture, database design, and front-end development, specifically leveraging the power of the Java/Spring ecosystem.

---

# 🔗 Live Render Link - Give it a Try
https://omicron-team-stats-cf8-frontend.onrender.com/

***Deployment Limitation (Render Free Tier):
The server is subject to "cold starts" upon inactivity.
While a PUT request cron job is activating every 12 minutes to mitigate downtime,
this solution is not fully reliable.
Expect initial response delays of up to 1 minute as the host resumes service.***

---

# 🚀 Quick Deployment

### Database (Recommended: MySQL/Postgres)
an empty database && config env files
### Backend (Recommended: IntelliJ)
cd backend && ./gradlew build && ./gradlew bootrun
### Frontend (Recommended: WebStorm)
cd frontend && npm install && npm run dev

### Access
🌐 App: http://localhost:3000

🔧 API: http://localhost:8080/api

📚 Docs: http://localhost:8080/swagger-ui.html

---

## ✨ Features
| Icon | Feature             | Description                           |
|------|---------------------|---------------------------------------|
| 📊 | **Statistics**      | Full player and match statistics      |
| 👥 | **Player Profiles** | Detailed player information and stats |
| 🏆 | **Leaderboards**    | Fan and player rankings               |
| 🔐 | **Authentication**  | Secure user login and registration    |
| 📱 | **Responsive**      | Works on all devices                  |

---

# 🛡️ Authentication

## User Dashboard (Logged-in Users)
Personalized experience for registered supporters.

👨‍💼 Create profile
📇 View profile
🖊️ Edit profile
❤️ Favorite player

## 🔐 Super Admin Dashboard

📋 View paginated profiles list
👁️ View any user profile
🖊️ Edit Competition Position

---

# 🌐 Website Structure & Navigation
- ├── 📁 Login
- ├── 📁 Register
- ├── 📁 Homepage
- ├── 📁 Statistics
- ├── 📁 Matches
    - ├── 📁 Schedule ├── 📁 Results ├── 📁 Detailed
- ├── 📁 Full Team
-   - ├── 📁 Player Bio ├── 📁 Player Stats ├── 📁 Coach Bio ├── 📁 Coach Stats
- ├── 📁 Club Info
- - ├── 📁 Competitions ├── 📁 History
- ├── 📁 Profile ├── 📁 Edit Profile
- └── 📁 Super Admin Page

---

# 🗺️ Database Map


<img width="1351" height="816" alt="ots_project_structure" src="https://github.com/user-attachments/assets/7f9184cc-3f64-476a-849b-2c82062a6521" />

---

# 📄 License
Distributed under the MIT License.

---

📧 konstantinoslisgaras@gmail.com

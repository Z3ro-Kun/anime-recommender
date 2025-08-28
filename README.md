🎌 Anime Recommendation System

A personalized Anime Recommendation System that generates suggestions based on your AniList (and soon MyAnimeList) anime list.
Built with FastAPI (backend) + React + Vite + Tailwind (frontend), and deployed using Render + Vercel.

⚡️ Developed with the help of ChatGPT, Gemini, and Lovable.

🚀 Features

🔗 Login with your AniList username to fetch your completed anime list.

🎯 Hybrid Recommendation Engine:

Direct recommendations (from AniList API)

Genre & tag–based recommendations (weighted scoring)

❌ Filters out duplicate seasons/spinoffs of the same anime.

✨ Modern frontend built with Tailwind + React.

🌍 Publicly deployed with Render (backend) & Vercel (frontend).

🛠️ Tech Stack

Backend (API)

FastAPI

Uvicorn

AniList GraphQL API

Frontend (Web App)

React + Vite

Tailwind CSS

Deployment

Backend → Render

Frontend → Vercel

📂 Project Structure
anime-recommender/
│── anime_recs_back/        # Backend
│   ├── backend/             # FastAPI app
│   └── requirements.txt
│
└── anime_recs_front/        # Frontend
    └── anime-recs-bliss/    # React + Vite + Tailwind app

⚡ Getting Started (Local Development)
🔹 Backend
cd anime_recs_back
pip install -r requirements.txt
uvicorn backend.main:app --reload


API will run on:

http://127.0.0.1:8000

🔹 Frontend
cd anime_recs_front/anime-recs-bliss
npm install
npm run dev


Frontend will run on:

http://127.0.0.1:5173

🌍 Live Deployment

Frontend: Vercel App URL

Backend: Render API URL

🧠 Credits

💡 Built with ChatGPT, Gemini, and Lovable

⚙️ Powered by the AniList API

🚀 Deployed via Render & Vercel

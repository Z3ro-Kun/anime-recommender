<div style="background-color: #f6f8fa; border: 1px solid #d0d7de; border-radius: 10px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png" alt="Anime Logo" width="100"/>
</div>

<h1 align="center">🎌 Anime Recommendation System 🎌</h1>

<p align="center">
  A personalized anime recommendation engine powered by the <b>AniList API</b>.
  <br />
  Built with <b>FastAPI</b> ⚡ + <b>React + Vite + Tailwind</b> 🎨 and deployed live!
</p>

<p align="center">
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
  <img alt="Render" src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
</p>

---

## ✨ Core Features

* 🎯 **Hybrid Recommendation Engine**: Combines direct recommendations from the AniList API with a custom genre and tag-based scoring system for weighted results.
* ❌ **No Duplicate Seasons**: Intelligently filters out sequels, prequels, and spinoffs to provide unique anime suggestions.
* 🎨 **Modern & Responsive UI**: A clean and intuitive interface built with React and styled with Tailwind CSS.
* 🔗 **Clickable Recommendations**: Every recommended anime links directly to its official AniList page for easy access.
* 🌍 **Live Deployment**: The project is deployed and ready to be used instantly.

---

## 🛠️ Tech Stack

| Layer      | Technology                                              |
| :--------- | :------------------------------------------------------ |
| **Backend** | ⚡ FastAPI, 🚀 Uvicorn, 📡 AniList GraphQL API           |
| **Frontend** | ⚛️ React, ⚡ Vite, 🎨 Tailwind CSS                        |
| **Deployment** | ☁️ Render (API), ▲ Vercel (Web App)                     |

---

```bash
anime-recommender/
│
├── anime_recs_back/        # Backend (FastAPI)
│   ├── backend/            # Main application source code
│   └── requirements.txt    # Python dependencies
│
└── anime_recs_front/       # Frontend
    └── anime-recs-bliss/   # React + Vite + Tailwind application
```
## 🚀 Getting Started (Local Development)

### **Prerequisites**

* [Node.js](https://nodejs.org/) (v18 or newer)
* [Python](https://www.python.org/) (v3.9 or newer)
* `pip` and `npm` package managers

### **1. Backend Setup (FastAPI)**

Clone the repository and navigate to the backend directory:

```bash
cd anime_recs_back
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

➡️ Runs at: http://127.0.0.1:8000

### **1. Frontend Setup **

```bash
cd anime_recs_front/anime-recs-bliss
npm install
npm run dev
```

➡️ Runs at: http://127.0.0.1:5173

## 🌍 Live Deployment

* Frontend: 🌐 Vercel App 
* Backend: ⚡ Render API 

### 👤 Try it with my AniList username → 00ZeroKun00

## ⚠️ Known Issues

⚠️ **The AniList API sometimes returns null/none values on frequent calls due to rate limiting (90 requests/min).**
✅ **Planned improvements: caching, retries, and throttling for better reliability.**

## 🧠 Credits

* 💡 Built with ChatGPT, Gemini, and Lovable
* ⚙️ Powered by the AniList API
* 🚀 Deployed with Render & Vercel

<p align="center"> Made with ❤️ + ☕ + 🎌 </p>

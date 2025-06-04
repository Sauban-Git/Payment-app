# 💸 Full Stack Banking App

A full-stack Paytm-style application for creating accounts, signing in, managing balances, and transferring funds between users.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion  
- **Backend:** Node.js + Express + MongoDB (Mongoose)  
- **Database:** MongoDB  
- **Auth:** JWT-based authentication  
- **Containerized:** Docker & Docker Compose  
- **Deployable On:** Render, Railway  

---

## 📁 Folder Structure
```
.
├── frontend/ # React client
│ ├── Dockerfile
│ └── .env
├── backend/ # Express server
│ ├── Dockerfile
│ └── .env
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Environment Variables

### 📦 Backend (`/backend/.env`)

```env
PORT=5000                             # Only used for local dev
db_url=mongodb://xyz/                 # Your MongoDB url    
JWT_SECRET=your_super_secret_key
fe_urls=your_frontend_urls            # Use any two url for cors
```
### 🌐 Frontend (`/frontend/.env`)

```env
VITE_BE_URL=your_baackend_url         # Your backend url  
```

---

## 🐳 Local Development (Docker Compose)
1. Start all services:
```
docker-compose up --build
```

---

## 🧑‍💻 Contributing

 ```Clone the repo:
git clone https://github.com/your-username/paytm-clone.git
```
Set up .env files in both frontend/ and backend/ as shown above.

```Run with Docker or manually with:
cd backend && npm install && npm start
cd frontend && npm install && npm run dev
```

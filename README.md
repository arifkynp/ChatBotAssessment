# 🚀 Chat Application (SolidJS + Bun + JWT Auth)

This is a fullstack chat application built for **local development**.

- **Frontend:** SolidJS + Vite
- **Backend API:** Bun
- **Auth:** JWT (JSON Web Token)
- **Database:** MySQL (optional)

---

## 📦 Tech Stack

### Frontend (FE)
- SolidJS
- Vite
- Axios

### Backend (API)
- Bun runtime
- JWT authentication
- MySQL (optional integration)

---

# ⚙️ Local Setup

## 1. Install dependencies

```bash
bun install
```

---

# 🚀 Running in Local Development

## 🟢 2. Run Backend API (PORT 3000)

```bash
bun run api/server.ts
```

👉 Backend runs at:
http://localhost:3000

---

## 🔵 3. Run Frontend (PORT 3001)

```bash
bun run dev
```

👉 Frontend runs at:
http://localhost:3001

---

# ⚠️ Port Configuration

Make sure your project uses these ports:

## Backend (.env)
PORT=3000

## Frontend (vite.config.ts)
server:
  port: 3001

---

# 🔐 Environment Variables

Create `.env` in project root:

PORT=3000
JWT_SECRET=your_secret_key

DB_USER=root
DB_PASS=password

.sql file can be find under ~/migrations dir

---

# 📡 API Flow

- Frontend: http://localhost:3001
- Backend: http://localhost:3000

Frontend calls API like:
http://localhost:3000/api/...

---

# 🚀 Quick Start

bun install
bun run api/server.ts   # backend (3000)
bun run dev             # frontend (3001)

---

# 🧠 Notes

- This setup is **local only**
- No Nginx or systemd required
- Ensure CORS allows http://localhost:3001
- Backend must be running before frontend API calls work

<div align="center">

# FinSight

**A modern, full-stack personal finance dashboard built for clarity and control.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Deployment](#-deployment)

</div>

---

## Overview

FinSight is a full-stack financial management application that lets you track income, manage expenses, and visualize spending trends — all in a clean, glassmorphism-styled dashboard. Built with a Spring Boot REST API and a React frontend, it's designed to be fast, secure, and extensible.

![Dashboard Preview](https://via.placeholder.com/900x450/1e1b4b/818cf8?text=FinSight+Dashboard+Preview)

---

## Features

- **Dashboard Overview** — At-a-glance summary of total income, expenses, and net balance with trend indicators
- **Interactive Charts** — Animated pie charts and category breakdowns powered by Recharts
- **Transaction Management** — Add, view, and delete income and expense records with full CRUD support
- **Secure Authentication** — Spring Security with Basic Auth protecting all API endpoints
- **Responsive UI** — Mobile-first layout using Tailwind CSS v4 with glassmorphism aesthetics
- **Dual Database Support** — H2 in-memory for development, PostgreSQL for production

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tooling |
| Tailwind CSS v4 | Utility-first styling with glassmorphism |
| Recharts | Data visualization and charts |
| React Router Dom | Client-side routing |
| Axios | HTTP client for API communication |
| Lucide React | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| Spring Boot 3.x | REST API framework |
| Spring Security | Authentication and authorization |
| Java 17+ | Application language |
| Maven | Dependency management and build tool |
| H2 / PostgreSQL | Development / Production database |

---

## Project Structure

```
FinSight/
├── backend/                        # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/               # Controllers, Services, Repositories, Models
│   │   │   └── resources/          # application.properties, static assets
│   │   └── test/                   # Unit and integration tests
│   ├── pom.xml                     # Maven dependencies
│   └── mvnw                        # Maven wrapper script
│
├── frontend/                       # React + Vite Application
│   ├── src/
│   │   ├── components/ui/          # Reusable components (Cards, Buttons, Modals)
│   │   ├── pages/                  # Dashboard, Records, Login pages
│   │   ├── services/               # Axios instance and API helpers
│   │   ├── App.jsx                 # Root component and routing
│   │   ├── index.css               # Global styles and Tailwind imports
│   │   └── main.jsx                # Application entry point
│   ├── vite.config.js              # Vite and proxy configuration
│   └── package.json                # NPM dependencies
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

## Getting Started

### Prerequisites

- **Java 17+** and **Maven** (or use the included Maven wrapper)
- **Node.js 18+** and **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/Ayushpremrocks/finsight.git
cd finsight
```

### 2. Run the Backend

```bash
cd backend

# macOS / Linux
./mvnw spring-boot:run

# Windows (PowerShell)
.\mvnw.cmd spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`.

> **Note:** The Vite dev server is pre-configured to proxy `/api` requests to `localhost:8080`, so no additional CORS setup is needed during local development.

---

## API Reference

All endpoints are prefixed with `/api/v1` and require Basic Authentication.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard/summary` | Returns totals and a breakdown by category |
| `GET` | `/records` | Fetches all transactions |
| `POST` | `/records` | Creates a new income or expense record |
| `DELETE` | `/records/{id}` | Deletes a transaction by ID |

### Example Request

```bash
curl -u user:password \
  -H "Content-Type: application/json" \
  -X POST http://localhost:8080/api/v1/records \
  -d '{"type":"EXPENSE","category":"Food","amount":45.00,"description":"Lunch"}'
```

---

## Deployment

### Backend — Render / Railway

1. Connect your GitHub repository to [Render](https://render.com) or [Railway](https://railway.app).
2. Set the build command to `./mvnw clean package -DskipTests`.
3. Set the start command to `java -jar target/*.jar`.
4. Add the following environment variables:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>/<db>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
```

### Frontend — Vercel / Netlify

1. Import the `frontend/` directory into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set the following environment variable in your project settings:

```env
VITE_API_URL=https://your-backend-url.com
```

3. Deploy. The build command is `npm run build` with output directory `dist`.

---

## Author

**Ayush** · [@AyushpremRocks](https://github.com/Ayushpremrocks)

---

<div align="center">

If you found this project useful, consider giving it a ⭐

</div>

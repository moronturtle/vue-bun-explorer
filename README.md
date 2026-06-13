# Vue Bun Explorer

A Windows Explorer-like web application built with Bun, Elysia, Vue 3, and PostgreSQL.

## Project Structure

This is a monorepo using Bun workspaces:

```
vue-bun-explorer/
├── apps/
│   ├── backend/         # Bun + Elysia + Prisma + PostgreSQL
│   │   └── src/
│   └── frontend/        # Vue 3 + Vite + TypeScript
│       └── src/
├── packages/
│   └── shared-types/    # Shared TypeScript interfaces
│       └── src/
├── docker-compose.yml
├── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [Docker Compose](https://docs.docker.com/compose/) (for PostgreSQL)

## Getting Started

### 1. Install Dependencies

Install all dependencies for the monorepo:

```bash
bun install
```

### 2. Setup Environment Variables

Copy the example environment file and configure it:

```bash
cp apps/backend/.env.example apps/backend/.env
```

The default PostgreSQL configuration from docker-compose.yml is:
- **User**: `postgres`
- **Password**: `postgres`
- **Database**: `vue_bun_explorer`
- **Host**: `localhost`
- **Port**: `5432`

So your `DATABASE_URL` in `.env` should be:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vue_bun_explorer"
```

### 3. Start PostgreSQL Database

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Download and start PostgreSQL 16 Alpine image
- Create a database named `vue_bun_explorer`
- Expose PostgreSQL on port `5432`
- Persist data in a Docker volume named `postgres_data` (data won't be lost when container stops)

To check if PostgreSQL is running:
```bash
docker-compose ps
```

To view PostgreSQL logs:
```bash
docker-compose logs postgres
```

To stop PostgreSQL:
```bash
docker-compose down
```

### 4. Setup Database Schema (Backend) - *Only needed once or when schema changes*

Run Prisma migrations to create database tables:

```bash
cd apps/backend
bun run prisma:migrate
```

Generate Prisma client:
```bash
bun run prisma:generate
```

> **Note**: You only need to run these commands:
> - On initial setup
> - When you modify the Prisma schema (`prisma/schema.prisma`) - e.g., adding tables, changing fields
> - When adding a new table: run `prisma migrate` first, then `prisma generate`
> - You do NOT need to run these every time you start development

### 5. Start Development Servers - *Run this every time you want to develop*

**Option 1: Run both backend and frontend from root**

```bash
bun run dev
```

This will start:
- Backend on `http://localhost:3000` (or configured port)
- Frontend on `http://localhost:5173` (or configured port)

**Option 2: Run individually**

```bash
# Backend only
cd apps/backend
bun run dev

# Frontend only (in another terminal)
cd apps/frontend
bun run dev
```

### 6. Access the Application

- Frontend: Open `http://localhost:5173` in your browser
- Backend API: `http://localhost:3000` (or check backend console for actual port)
- Prisma Studio (optional): Run `cd apps/backend && bun run prisma:studio` to manage database visually

## Apps & Packages

### Backend (`apps/backend`)
- Runtime: Bun
- Framework: Elysia
- ORM: Prisma
- Database: PostgreSQL

### Frontend (`apps/frontend`)
- Framework: Vue 3
- Build Tool: Vite
- Language: TypeScript

### Shared Types (`packages/shared-types`)
- Shared TypeScript interfaces and types
- Used by both backend and frontend

## Scripts

- `bun run dev` - Start all apps in development mode
- `bun run dev:backend` - Start backend only
- `bun run dev:frontend` - Start frontend only
- `bun run build` - Build all apps
- `bun run lint` - Lint all apps

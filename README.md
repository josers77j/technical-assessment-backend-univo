# Technical Assessment Backend API

REST API built with NestJS, Prisma, and PostgreSQL for managing providers and products.

## Requirements

- Node.js 24.x
- pnpm
- Docker and Docker Compose (optional, if you want to run PostgreSQL locally with containers)

## Installation

Install dependencies:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# App
PORT=3000

# Database connection used by Nest + Prisma
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technical_assessment?schema=public"

# Used by docker-compose.yml
DB_NAME=technical_assessment
DB_USER=postgres
DB_PASSWORD=postgres
```

## Database Setup

You have two options.

### Option A: Run PostgreSQL with Docker Compose

From the project root:

```bash
docker compose up --build -d
```

### Option B: Use an existing PostgreSQL database

If you already have PostgreSQL running, just update `DATABASE_URL` in `.env`.

## Prisma Setup

Run migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Run the API

Start in development mode:

```bash
pnpm run start:dev
```

Base URL:

```text
http://127.0.0.1:3000/api/v1
```

## API Documentation (Swagger)

Swagger UI:

```text
http://127.0.0.1:3000/api/docs
```

## Testing

Run tests in watch mode:

```bash
pnpm run test:watch
```

Run tests with coverage:

```bash
pnpm run test:cov
```

## Main Endpoints

- `GET /api/v1/providers`
- `GET /api/v1/providers/:id`
- `POST /api/v1/providers`
- `PATCH /api/v1/providers/:id`
- `DELETE /api/v1/providers/:id`
- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `POST /api/v1/products`
- `PATCH /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

## Notes

- Global validation is enabled (`whitelist`, `forbidNonWhitelisted`, `transform`).
- Global Prisma exception filter is enabled for common Prisma error codes.

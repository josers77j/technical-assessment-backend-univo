# Technical Assessment Backend API

REST API built with NestJS, Prisma, and PostgreSQL for managing providers and products.

## 1. Project Title and Description

This project exposes a versioned REST API for:

- Provider management
- Product management
- Filtering, pagination, sorting, and field selection

The API is documented with Swagger and follows a modular NestJS structure.

## 2. Technology Stack

- NestJS 11
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger / OpenAPI
- Jest + Supertest
- Docker Compose (optional for local database)

## 3. Prerequisites and System Requirements

- Node.js 24.x
- pnpm
- PostgreSQL (local or external)
- Docker and Docker Compose (optional)

## 4. Installation Instructions (Step-by-Step)

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Create your `.env` file (see configuration section below).
4. Start PostgreSQL (local docker or external service).
5. Run Prisma migrations and generate client.
6. Start the API.

## 5. Configuration Details (Environment Variables)

Create a `.env` file in the project root:

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

Notes:

- `DATABASE_URL` can point to a managed database (Neon, Supabase, Render, Railway, etc.).
- Ensure the target database allows inbound connections from your deployment provider.

## 6. Database Setup and Migration Commands

### Option A: Local PostgreSQL with Docker Compose

```bash
docker compose up --build -d
```

### Option B: External PostgreSQL

Use a previously created managed database and set `DATABASE_URL` accordingly.

### Prisma Commands

```bash
npx prisma migrate dev --name init
npx prisma generate
```

For production environments:

```bash
npx prisma migrate deploy
npx prisma generate
```

## 7. How to Run the Application Locally

Development mode:

```bash
pnpm run start:dev
```

Production mode (after build):

```bash
pnpm run build
pnpm run start:prod
```

Base URL:

```text
http://127.0.0.1:3000/api/v1
```

## 8. API Documentation

### Swagger / OpenAPI

- Swagger UI: `http://127.0.0.1:3000/api/docs`

### Endpoint Descriptions

#### Providers

- `GET /api/v1/providers`: List providers with pagination/filter/sort/fields.
- `GET /api/v1/providers/:id`: Get a provider by id.
- `POST /api/v1/providers`: Create provider.
- `PATCH /api/v1/providers/:id`: Update provider.
- `DELETE /api/v1/providers/:id`: Delete provider.

#### Products

- `GET /api/v1/products`: List products with pagination/filter/sort/fields and price range.
- `GET /api/v1/products/:id`: Get a product by id.
- `POST /api/v1/products`: Create product.
- `PATCH /api/v1/products/:id`: Update product.
- `DELETE /api/v1/products/:id`: Delete product.

### Query Parameter Explanations

Common list parameters:

- `page`: current page (example: `1`)
- `limit`: records per page (example: `10`)
- `filter`: free text search
- `sort`: comma-separated fields, use `-` prefix for desc (example: `name,-createdAt`)
- `fields`: comma-separated response field selection

Product-specific list parameters:

- `priceMin`: minimum product price
- `priceMax`: maximum product price

### Request / Response Examples

Create provider request:

```http
POST /api/v1/providers
Content-Type: application/json

{
	"name": "Tech Supplier",
	"email": "contact@techsupplier.com",
	"phone": "+1-555-0101",
	"status": "ACTIVE"
}
```

Create provider response (example):

```json
{
	"id": 1,
	"name": "Tech Supplier",
	"email": "contact@techsupplier.com",
	"phone": "+1-555-0101",
	"status": "ACTIVE",
	"createdAt": "2026-03-21T18:00:00.000Z",
	"updatedAt": "2026-03-21T18:00:00.000Z"
}
```

Create product request:

```http
POST /api/v1/products
Content-Type: application/json

{
	"name": "Laptop Pro 14",
	"description": "High performance laptop",
	"price": "1499.99",
	"providerId": 1
}
```

Create product response (example):

```json
{
	"id": 1,
	"name": "Laptop Pro 14",
	"description": "High performance laptop",
	"price": "1499.99",
	"providerId": 1,
	"createdAt": "2026-03-21T18:00:00.000Z",
	"updatedAt": "2026-03-21T18:00:00.000Z"
}
```

### Authentication Details

No authentication is currently implemented. All endpoints are public in this technical assessment.

## 9. Testing Instructions

Run unit/integration tests:

```bash
pnpm run test
```

Watch mode:

```bash
pnpm run test:watch
```

Coverage:

```bash
pnpm run test:cov
```

E2E tests:

```bash
pnpm run test:e2e
```

## 10. Deployment Information

Below is a practical deployment flow for most platforms (Render, Railway, Fly.io, EC2, etc.).

1. Provision a PostgreSQL database in your target provider (or use an existing managed DB).
2. Copy the connection string and set it as `DATABASE_URL` in your deployment environment variables.
3. Set app env vars (at minimum `PORT` and `DATABASE_URL`).
4. Install dependencies in CI/build stage:

```bash
pnpm install --frozen-lockfile
```

5. Build the project:

```bash
pnpm run build
```

6. Run production migrations on deploy:

```bash
npx prisma migrate deploy
```

7. Start the API:

```bash
pnpm run start:prod
```

Recommended deployment checks:

- Health check endpoint through `/api/v1/...` route availability.
- Swagger route available at `/api/docs` if enabled in the deployed environment.
- Database connectivity validated in logs after startup.

## 11. Known Issues or Limitations

- No authentication/authorization layer implemented.
- No rate limiting.
- No background jobs/queues.
- No caching strategy yet.
- Swagger examples are representative and may vary if DTOs evolve.

## Branching Strategy

This repository currently uses `main`, but the intended branching model is:

- `prod`: stable production releases
- `uat`: user acceptance testing before production
- `qa`: testing-focused environment branch
- `dev`: active development integration branch

Supporting branches:

- `feature/*`: new features, usually created from `dev`
- `hotfix/*`: urgent fixes created from `prod` and then merged back to `prod` and `dev` (and other relevant branches)

## Optional Architecture Notes

Project is organized by domain modules and responsibilities:

- `src/modules/providers`: providers controller/service/repository/dtos
- `src/modules/products`: products controller/service/repository/dtos
- `src/shared`: shared filters and reusable pieces
- `prisma`: Prisma schema and migrations

## Commit Message Convention

Conventional commits are recommended:

- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `chore: ...`
- `docs: ...`

Examples:

- `feat: add provider pagination`
- `fix: handle prisma not found error`

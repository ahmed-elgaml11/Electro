# Task Management API

A robust REST API for managing Projects and Tasks with role-based access control (RBAC).

## Features
- **Authentication**: User registration and login returning a JWT.
- **Roles**: `Admin` and `Member`.
- **Authorization**: 
  - `Admin` can create, view, update, and delete any Project or Task in the system.
  - `Member` can create Projects (becomes the owner), and can only view, update, and delete Projects they own. They can only manage Tasks within their own Projects.
- **Projects**: Full CRUD (Create, Read, Update, Delete).
- **Tasks**: Full CRUD within a Project, with filtering by `status` and `priority`.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Authentication**: JWT (jsonwebtoken)
- **Testing**: Jest + ts-jest
- **Containerization**: Docker & Docker Compose

## .env.example
```env
PORT=3000
NODE_ENV=development
DATABASE=mongodb://localhost:27017/todoapp
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=90d
```

## How to Run Locally

### Using Node directly
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust the values:
   ```bash
   cp .env.example .env
   ```
3. Ensure MongoDB is running locally on port `27017`.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. The API will be available at `http://localhost:3000/api/v1`.

### Using Docker Compose
Docker Compose spins up **two containers**: the Node.js app and a MongoDB instance. It reads environment variables from a `.env` file (not `config.env`) using the `env_file` directive.

1. Create a `.env` file in the project root (for Docker):
   ```bash
   cp .env.example .env
   ```
2. **Important**: Update the `DATABASE` variable in `.env` to point to the mongo container name instead of `localhost`:
   ```env
   DATABASE=mongodb://root:example@mongo:27017/todoapp?authSource=admin
   ```
   - `root:example` are the credentials defined in `docker-compose.yml` under `MONGO_INITDB_ROOT_USERNAME` / `MONGO_INITDB_ROOT_PASSWORD`.
   - `mongo` is the service name which Docker resolves as a hostname.
   - `?authSource=admin` is required when using MongoDB root credentials.

3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
4. The API will be available at `http://localhost:3000/api/v1`.
5. To stop the containers:
   ```bash
   docker-compose down
   ```
6. To stop and **remove all data** (volumes):
   ```bash
   docker-compose down -v
   ```

#### What does Docker Compose do?
- **`node-app` service**: Builds the Dockerfile, exposes port `3000`, reads env vars from `.env`, and waits for the `mongo` service to start first.
- **`mongo` service**: Pulls the official `mongo` image, persists data in a named volume `mongo-db`, and creates a root user with the credentials specified in the `environment` block.

## Running Tests
The project uses **Jest** with **ts-jest** for schema validation tests. Tests are co-located with their modules (e.g. `src/api/projects/projects.schema.test.ts`).

```bash
# Run all tests
npm test

# Or using npx directly
npx jest

# Run a specific test file
npx jest src/api/auth/auth.schema.test.ts

# Run tests in watch mode
npx jest --watch
```

## Database Migration / Seeding
To populate the database with an Admin user, a Member user, and sample data:
```bash
npx tsx seed.ts
```

**Default Users:**
| Role   | Email                | Password      |
|--------|----------------------|---------------|
| Admin  | admin@example.com    | password123   |
| Member | member@example.com   | password123   |

## API Documentation
A Postman collection (`postman_collection.json`) is included in the root directory. Import it into Postman to test all available endpoints.

## Assumptions and Implementation Notes
See [notes.txt](./notes.txt) for a detailed list of assumptions and design decisions.

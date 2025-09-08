# Dolce Vita Pushkar - Backend

This is the backend API for the Dolce Vita Pushkar website, built with Node.js, Express, and TypeScript.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js) or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dolce-vita-next/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the environment variables in `.env` as needed

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000` by default.

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server (make sure to build first)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   ├── validators/    # Request validation
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore file
├── nodemon.json      # Nodemon configuration
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## API Documentation

### Health Check

- **Endpoint:** `GET /api/health`
- **Description:** Check if the API is running
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Server is running",
    "timestamp": "2025-07-31T05:45:12.123Z"
  }
  ```

## Environment Variables

See `.env.example` for all available environment variables.

## License

ISC

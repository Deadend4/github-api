import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const dbURL = process.env.DATABASE_URL;
export const port = process.env.PORT || 3001;
export const ghAuthToken = process.env.GITHUB_AUTH_TOKEN;
export const dbHost = process.env.DATABASE_HOST;
export const dbName = process.env.DATABASE_NAME;
export const dbPort = process.env.DATABASE_PORT;
export const dbUser = process.env.DATABASE_USER;
export const dbPassword = process.env.DATABASE_PASSWORD;

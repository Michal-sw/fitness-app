import { Client, ClientConfig } from "pg";


const dbConnData: ClientConfig = {
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB || 'calorie_db',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password'
}
const postgresClient: Client = new Client(dbConnData);
export default postgresClient;
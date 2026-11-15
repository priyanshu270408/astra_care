
import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { connectDatabase } from "./config/db";
import { initSocket } from "./config/socket";

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
initSocket(server);

// Export for Vercel
export default server;

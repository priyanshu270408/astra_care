
import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { initSocket } from "./config/socket";

const server = createServer(app);
initSocket(server);

if (require.main === module) {
  const port = Number(process.env.PORT) || 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`AstroCare API listening on port ${port}`);
  });
}

export default server;

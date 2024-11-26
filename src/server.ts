import express, { Request, Response } from "express";
import config from "./config.json";

const app = express();
app.use(express.json());

// Health Check
app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ healthStatus: "healthy" });
});

//Get
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    data: req.query,
  });
});

//Post
app.post("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    data: req.body,
  });
});

const httpServer = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// Graceful shutdown function
function GracefullShutdown() {
  console.log("Server is shutting down");
  httpServer.close();
  console.log("Server is shut down");
  console.log("Bye bye!");
  process.exit();
}
// Graceful shutdown
process.on("SIGINT", GracefullShutdown);

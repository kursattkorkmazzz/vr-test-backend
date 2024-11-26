"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_json_1 = __importDefault(require("./config.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Health Check
app.get("/healthcheck", (req, res) => {
    res.status(200).json({ healthStatus: "healthy" });
});
//Get
app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        data: req.query,
    });
});
//Post
app.post("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        data: req.body,
    });
});
const httpServer = app.listen(config_json_1.default.port, () => {
    console.log(`Server is running on port ${config_json_1.default.port}`);
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

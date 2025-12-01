import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";
import corsOptions from "./config/cors";

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());

// CORS - Only allow frontend (Lab requirement: "Requests should only be accepted from the front-end")
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Pixell River Financial API" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);

export default app;

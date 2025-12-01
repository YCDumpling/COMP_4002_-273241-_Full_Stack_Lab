import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";
import corsOptions from "./config/cors";

dotenv.config();

const app: Express = express();

app.use(express.json());

//add cors middleware
app.use(cors(corsOptions));

// add clerk middleware
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Pixell River Financial API" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);

export default app;

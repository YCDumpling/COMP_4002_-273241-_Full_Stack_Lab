import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";
import seedRoutes from "./routes/seedRoutes";
import corsOptions from "./config/cors";

dotenv.config();

const app: Express = express();

app.use(express.json());

//add cors middleware
app.use(cors(corsOptions));

// add clerk middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Pixell River Financial API" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/seed", seedRoutes);

export default app;

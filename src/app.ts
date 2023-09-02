import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors';

const app = express();

// Settings
app.set("port", 2400);

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

export default app;
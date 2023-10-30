import cors from "cors";
import express, {Express} from "express";
import helmet from "helmet";
import morgan from "morgan";

import itemRoutes from "./routes/item.routes";

const app: Express = express();

// Settings
app.set("port", 4200);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    frameguard: {
        action: "deny",
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
    referrerPolicy: {
        policy: "same-origin",
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    }));

// Routes
app.use("/api/items", itemRoutes);


export default app;
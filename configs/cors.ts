import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://coym.netlify.app"
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.options("*", (req: Request, res: Response) => {
  res.sendStatus(200);
});

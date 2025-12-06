import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./configs/cors";

import accountRouter from "./routes/accountRoute";
import commentRouter from "./routes/commentRoute";
import likeRouter from "./routes/likeRoute";
import majorRouter from "./routes/majorRoute";
import replyRouter from "./routes/replyRoute";
import requestRouter from "./routes/requestRoute";
import testRouter from "./routes/testRoute";

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 10000;

// app.use(cors(corsOptions));
const allowedOrigins = [
  'http://localhost:8888',       // local dev
  'https://coym.netlify.app',   // deployed site
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman) or in allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// app.options("*", cors(corsOptions)); // pre-flight for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(accountRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(majorRouter);
app.use(replyRouter);
app.use(requestRouter);
app.use(testRouter);

httpServer.listen(PORT, () => console.log(`Http Server running on port ${PORT}.`));

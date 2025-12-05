export const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8080",
    "https://coym.netlify.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionSuccessStatus: 200
};

// middlewares/corsMiddleware.js
import cors from "cors";
import * as dotenv from 'dotenv';

dotenv.config();

const origin = process.env.ORIGIN || 'https://progser-dp.vercel.app';

const corsOptions = {
  origin: [origin], // Explicitly allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

//const corsMiddleware = cors(corsOptions);
const corsMiddleware = cors();

export default corsMiddleware;

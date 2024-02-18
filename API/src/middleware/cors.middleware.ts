// middlewares/corsMiddleware.js
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:4200/"], // Explicitly allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

//const corsMiddleware = cors(corsOptions);
const corsMiddleware = cors();

export default corsMiddleware;

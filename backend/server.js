import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import entriesRoutes from "./routes/entries.js";

dotenv.config();
const app = express();

// middelwares
app.use(cors());
app.use(express.json()); 

// connect to Mongodb
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connect error:", err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", entriesRoutes);

// health check
app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

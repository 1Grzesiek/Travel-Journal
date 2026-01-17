import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import entriesRoutes from "./routes/entries.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "https://travel-journal22.netlify.app",
  credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/entries", entriesRoutes);


app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  });

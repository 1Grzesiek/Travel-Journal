import express from "express";
import auth from "../middleware/auth.js";
import { getEntries, createEntry, updateEntry, deleteEntry } from "../controllers/entriesController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 20 }
]);

router.get("/", auth, getEntries);
router.post("/", auth, uploadMiddleware, createEntry);
router.put("/:id", auth, uploadMiddleware, updateEntry);
router.delete("/:id", auth, deleteEntry);

export default router;

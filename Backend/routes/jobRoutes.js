import express from "express";
import { getJobs } from "../controllers/jobController.js";

const router = express.Router();

// This is correct - no issues here
router.get("/jobs", getJobs);

export default router;

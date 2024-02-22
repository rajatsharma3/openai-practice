import express from "express";
import { getAnswer } from "./openai.services.js";
const router = express.Router();

router.post("/getanswer", getAnswer);

export default router;

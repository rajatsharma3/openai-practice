import express from "express";

import { trainModel } from "./openai.trainmodel.js";
import { getAnswer } from "./openai.services.js";
const router = express.Router();

router.post("/getanswer", getAnswer);
router.post("/trainmodel", trainModel);

export default router;

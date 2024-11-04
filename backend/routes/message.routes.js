import express from "express";
import { sendMessage } from "../controllers/message.contoller.js";

const router = express.Router();

router.post("/send/:id", sendMessage);

export default router;
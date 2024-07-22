import express from "express";

import { allMessages, sendMessage } from "../Controllers/messageController.js";

import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;

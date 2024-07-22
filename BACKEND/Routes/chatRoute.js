import express from 'express';
import { protect } from '../Middlewares/authMiddleware.js';
import {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
  } from '../Controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.route("/").post(protect, accessChat); // accesschat--> 2 person ke liye chat
chatRouter.route("/").get(protect, fetchChats); // fetch all chats
chatRouter.route("/group").post(protect, createGroupChat);
chatRouter.route("/rename").put(protect, renameGroup);
chatRouter.route("/groupremove").put(protect, removeFromGroup);
chatRouter.route("/groupadd").put(protect, addToGroup);



export default chatRouter;
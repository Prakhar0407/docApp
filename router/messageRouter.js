import express from "express";
import {sendMessage} from "../controller/messageControl.js";
import {getAllMessages} from "../controller/messageControl.js";
import { isAdminAuthenticated } from "../middlewares/authenticateAndAuthorize.js";

const router = express.Router();

router.post("/send", sendMessage);  //because we are sending the message
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;

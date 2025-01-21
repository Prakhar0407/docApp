import express from "express";
import userRouter from "./router/userRouter.js";
import {config} from "dotenv";
import cors from "cors"; //connecting frontend
const app= express();
config({ path: "./config/config.env" });
import fileUpload from "express-fileupload";

import { databaseworking } from "./database/databaseworking.js";
import cookieParser from "cookie-parser";

import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js";
app.use(cookieParser());
app.use(express.json());

databaseworking();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);
app.use(express.urlencoded({extended: true}));  //date etc. readable

app.use(  //accoring to documentaion
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );


app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use(errorMiddleware);
export default app;
import express from "express";

import {
postAppointment, getAllAppointments ,   deleteAppointment,  updateAppointmentStatus,
} from "../controller/appointmentControl.js";

import {
  isPatientAuthenticated,isAdminAuthenticated
} from "../middlewares/authenticateAndAuthorize.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);

//id required
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
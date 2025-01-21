import express from "express";
import {
  addAdmin,
  login,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userControl.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/authenticateAndAuthorize.js";


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addadmin",isAdminAuthenticated ,addAdmin);

router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient)
;
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

router.get("/doctors", getAllDoctors);
router.post("/doctor/addnewdocor", isAdminAuthenticated, addNewDoctor);


export default router;

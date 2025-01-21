import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/schemaOfAppointment.js";
import { User } from "../models/schemaOfUser.js";


export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      appointmentDate,
      department,
      doctorFirstName,
      doctorLastName,
      hasVisited,
      address,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !appointmentDate ||
      !department ||
      !doctorFirstName ||
      !doctorLastName ||
      !address
    ) {
      return next(new ErrorHandler("Please fill all the Details!", 400));
    }
    const isConflict = await User.find({
      firstName: doctorFirstName,
      lastName: doctorLastName,
      role: "Doctor",
      doctorDepartment: department,
    });
    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor can not found", 404));
    }
  
    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Error! Please contact through Email Or Phone.",404 ));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      appointmentDate,
      department,
      doctor: {
        firstName: doctorFirstName,
        lastName: doctorLastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Send Successfully!",
      appointment,
      
    });
  });

  export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  });


  export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted Successfully!",
      appointment,
    });
  });

  export const updateAppointmentStatus = catchAsyncErrors(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment,
      });
    }
    
  );
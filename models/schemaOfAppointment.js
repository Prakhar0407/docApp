import mongoose from "mongoose";
import validator from "validator";

const schemaOfAppointment = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name Must Contain At Least 3 Letters!"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name Must Contain At Least 3 Letters!"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Email is not Valid!"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
      maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    dob: {
      type: Date,
      required: [true, "DOB is required!"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required!"],
      enum: ["Male", "Female"],
    },
  
    appointmentDate: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
      },
      department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
      doctor: {
        firstName: {
          type: String,
          required: [true, "Doctor First Name is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Doctor Last Name is Required!"],
        },
      },
      hasVisited: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        required: [true, "Address is Required!"],
      },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Done"],
        default: "Pending",
      },
      rate: {
        type: Number,
        enum: [0,1, 2, 3, 4, 5],
        default: 0,
      },
      
  });

  export const Appointment = mongoose.model("Appointment", schemaOfAppointment);
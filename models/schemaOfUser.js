import mongoose from "mongoose";

import validator from "validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const schemaOfUser = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Password Must Contain At Least 6 Characters!"],
    select: false,   //hidden
  },
  role: {
    type: String,
    required: [true, "User Role required!"],
    enum: ["Patient", "Admin", "Doctor"],
  },
  doctorDepartment:{
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },

});

schemaOfUser.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);  //save as different value
  });
  
  schemaOfUser.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  schemaOfUser.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
export const User = mongoose.model("User", schemaOfUser);

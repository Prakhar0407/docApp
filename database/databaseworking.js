import mongoose from "mongoose";

export const databaseworking = () => {
  
    mongoose.connect(process.env.MONGO_URI, {
      dbName: "Appointment_System_Deploy",  
      
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};

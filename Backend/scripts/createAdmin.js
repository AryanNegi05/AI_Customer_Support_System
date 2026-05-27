import mongoose from "mongoose";

import bcrypt from "bcrypt";

import dotenv from "dotenv";

import User from "../src/models/userModel.js";



dotenv.config();



// =====================================================
// CREATE ADMIN
// =====================================================

const createAdmin = async () => {

  try {

    // ===============================================
    // CONNECT DB
    // ===============================================

    await mongoose.connect(

      process.env.MONGO_URI

    );



    console.log(
      "MongoDB connected"
    );



    // ===============================================
    // CHECK EXISTING ADMIN
    // ===============================================

    const existingAdmin =
      await User.findOne({

        role: "admin"

      });



    if (existingAdmin) {

      console.log(
        "Admin already exists"
      );



      process.exit(0);

    }



    // ===============================================
    // HASH PASSWORD
    // ===============================================

    const hashedPassword =
      await bcrypt.hash(

        "admin123",

        10

      );



    // ===============================================
    // CREATE ADMIN
    // ===============================================

    const admin =
      await User.create({

        name: "System Admin",

        email:
          "admin@support.com",

        password:
          hashedPassword,

        role: "admin",

        skills: []

      });



    console.log(

      "Admin created:",

      admin.email

    );



    process.exit(0);

  }

  catch (error) {

    console.log(error);



    process.exit(1);

  }

};



createAdmin();
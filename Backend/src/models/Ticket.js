import mongoose from "mongoose";



const userSchema = new mongoose.Schema(

  {

    name: {

      type: String,

      required: true,

      trim: true

    },



    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true

    },



    password: {

      type: String,

      required: true

    },



    role: {

      type: String,

      enum: [

        "customer",

        "agent",

        "admin"

      ],

      default: "customer"

    },



    skills: {

      type: [String],

      enum: [

        "network_issue",

        "billing_issue",

        "login_problem",

        "payment_issue",

        "technical_bug"

      ],

      default: []

    }

  },

  {

    timestamps: true

  }

);



// IMPORTANT
export default mongoose.model(
  "User",
  userSchema
);
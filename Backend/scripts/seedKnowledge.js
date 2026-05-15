import mongoose from "mongoose";

import fs from "fs";

import dotenv from "dotenv";

import Knowledge from "../src/models/Knowledge.js";



dotenv.config();



// =====================================================
// CONNECT DATABASE
// =====================================================

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected");



// =====================================================
// READ JSON FILE
// =====================================================

const data = JSON.parse(

  fs.readFileSync(

    "./Knowldege-base/faq.json",

    "utf-8"

  )

);



// =====================================================
// INSERT DATA
// =====================================================

await Knowledge.deleteMany();

await Knowledge.insertMany(data);

console.log("Knowledge Base Seeded");



// =====================================================
// CLOSE CONNECTION
// =====================================================

mongoose.connection.close();
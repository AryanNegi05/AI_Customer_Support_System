// backend/src/scripts/createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // create admin document
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@support.com',
      password: hashedPassword,
      role: 'admin',
      skills: [],
    });

    console.log('Admin created successfully:', admin.email);
    process.exit(0);

  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



// =====================================================
// GENERATE JWT TOKEN
// =====================================================

const generateToken = (user) => {

  return jwt.sign(

    {
      id: user._id,
      role: user.role
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1d"
    }

  )

}



// =====================================================
// REGISTER
// =====================================================

export const register = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body

    if (
      req.body.role &&
      req.body.role !== "customer"
    ) {

      return res.status(403).json({
        message:
          "Cannot assign role manually"
      })

    }

    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      })

    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user =
      await User.create({

        name,
        email,

        password:
          hashedPassword,

        role: "customer"

      })

    const token =
      generateToken(user)

    return res.status(201).json({

      message:
        "User registered successfully",

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    })

  }

  catch (error) {

    return res.status(500).json({

      message:
        "Registration failed",

      error: error.message

    })

  }

}



// =====================================================
// LOGIN
// =====================================================

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body

    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"

      })

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials"

      })

    }

    const token =
      generateToken(user)

    return res.status(200).json({

      message:
        "Login successful",

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    })

  }

  catch (error) {

    return res.status(500).json({

      message:
        "Login failed",

      error: error.message

    })

  }

}



// =====================================================
// GET CURRENT USER
// =====================================================

export const getMe = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password")

    res.status(200).json({

      success: true,

      user

    })

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch user"

    })

  }

}
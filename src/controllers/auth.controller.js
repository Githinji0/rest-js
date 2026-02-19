import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import e from "express";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    //hashing the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //crating the user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user.id, res);

    //responding with the created user details (excluding password)
    res.status(201).json({
      status: "Success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
    console.error("Error registering user:", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for authenticated user
    const token = generateToken(user.id, res);

    // If login is successful, return user details (excluding password)
    res.status(201).json({
      status: "Success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          token: token,
        },
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in user" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt",{
        httpOnly: true,
        expires: new Date(0), // Set cookie expiration to a past date which is instantly expired
    });



    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Failed to log out user" });
  }
};

export { registerUser, loginUser, logoutUser };

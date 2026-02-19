import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";

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

    //responding with the created user details (excluding password)
    res.status(201).json({
      status: "Success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
    console.error("Error registering user:", error);
  }
};

export { registerUser };

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    const payload = {
      id: userId,
    };
    const token = jwt.sign(payload, {});
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

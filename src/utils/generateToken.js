import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const payload = {
      id: userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        secure : process.env.NODE_ENV === "production", // Set secure flag in production
        sameSite: "strict", // Prevent CSRF
    })
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

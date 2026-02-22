export const validateRequest = (schema) => {
  try {
    return (req, res, next) => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errorMessages = result.error.errors
          .map((err) => `${err.path.join(".")} - ${err.message}`)
          .join("; ");
        console.error("Validation errors:", errorMessages);
        return res
          .status(400)
          .json({ error: "Invalid request data", details: errorMessages });
      }
      next()
    };
  } catch (error) {
    console.error("Error validating request:", error);
    return res.status(400).json({ error: "Invalid request data" });
  }
};

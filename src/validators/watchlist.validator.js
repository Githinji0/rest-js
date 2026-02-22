import { z } from "zod";

const addToWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => {
        message: "Invalid status value. Allowed values are: PLANNED, WATCHING, COMPLETED, DROPPED";
      },
    })
    .optional()
    .default("PLANNED"),
  rating: z
    .coerce()
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10")
    .optional(),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

export { addToWatchlistSchema };

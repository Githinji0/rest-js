import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 const addTowatchlist = async (req, res) => {
  try {
    const { status, rating, notes, movieId, userId } = req.body;

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });

    if (existingInWatchlist) {
      return res.status(400).json({ error: "Movie already in watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      status: "Success",
      data: {
        watchlistItem,
      },
    });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
};


export { addTowatchlist };
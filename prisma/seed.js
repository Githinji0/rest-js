import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = "54c4bf5f-b727-4af4-b853-02c7b2575527";

const movies = [
  {
    title: "The Matrix",
    overview: "A computer hacker learns about the true nature of reality.",
    releaseYear: 1999,
    genre: ["Action", "Sci-Fi"],
    runTime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: creatorId,
  },
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology.",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    runTime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    genre: ["Action", "Crime", "Drama"],
    runTime: 152,
    posterUrl: "https://example.com/darkknight.jpg",
    createdBy: creatorId,
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, and others intertwine.",
    releaseYear: 1994,
    genre: ["Crime", "Drama"],
    runTime: 154,
    posterUrl: "https://example.com/pulpfiction.jpg",
    createdBy: creatorId,
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space.",
    releaseYear: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    runTime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years.",
    releaseYear: 1994,
    genre: ["Drama"],
    runTime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: creatorId,
  },
  {
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.",
    releaseYear: 1999,
    genre: ["Drama"],
    runTime: 139,
    posterUrl: "https://example.com/fightclub.jpg",
    createdBy: creatorId,
  },
  {
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
    releaseYear: 1994,
    genre: ["Drama", "Romance"],
    runTime: 142,
    posterUrl: "https://example.com/forrestgump.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control to his son.",
    releaseYear: 1972,
    genre: ["Crime", "Drama"],
    runTime: 175,
    posterUrl: "https://example.com/godfather.jpg",
    createdBy: creatorId,
  },
  {
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob.",
    releaseYear: 1990,
    genre: ["Biography", "Crime", "Drama"],
    runTime: 146,
    posterUrl: "https://example.com/goodfellas.jpg",
    createdBy: creatorId,
  },
];

const main = async () => {
  try {
    for (const movie of movies) {

        await prisma.movie.create({
            data: movie,
        })

        console.log(`Created movie: ${movie.title}`);

    }
    console.log("Database seeding completed successfully.");

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally{
    await prisma.$disconnect();
  }
};

main();
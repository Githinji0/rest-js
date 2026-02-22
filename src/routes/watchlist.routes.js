import express from "express";
import router from "./movieRoutes.js";
import { addTowatchlist, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlist.contoller.js";
import authMiddleware from "../middleware/auth.midleware.js";
import { validateRequest } from "../middleware/validate.midleware.js";
import { addToWatchlistSchema } from "../validators/watchlist.validator.js";

const routerAuth = express.Router();

routerAuth.use(authMiddleware);

routerAuth.post("/", validateRequest(addToWatchlistSchema), addTowatchlist);

routerAuth.delete("/:id",removeFromWatchlist);
routerAuth.put("/:id", validateRequest, updateWatchlistItem);

export default routerAuth;

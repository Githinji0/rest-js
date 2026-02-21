import express from "express";
import router from "./movieRoutes.js";
import { addTowatchlist, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlist.contoller.js";
import authMiddleware from "../middleware/auth.midleware.js";

const routerAuth = express.Router();

routerAuth.post("/", authMiddleware, addTowatchlist);

routerAuth.delete("/:id", authMiddleware, removeFromWatchlist);
routerAuth.put("/:id", authMiddleware, updateWatchlistItem);

export default routerAuth;

import express from "express";
import router from "./movieRoutes.js";
import { addTowatchlist } from "../controllers/watchlist.contoller.js";
import authMiddleware from "../middleware/auth.midleware.js";

const routerAuth = express.Router();


routerAuth.use( authMiddleware );
routerAuth.post("/", addTowatchlist);



export default routerAuth;
import express from "express";
import router from "./movieRoutes.js";
import { addTowatchlist } from "../controllers/watchlist.contoller.js";

const routerAuth = express.Router();

routerAuth.post("/", addTowatchlist);


export default routerAuth;
import express from "express";
import router from "./movieRoutes.js";
import { registerUser } from "../controllers/auth.controller.js";

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);

export default routerAuth;

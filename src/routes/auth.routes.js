import express from "express";
import router from "./movieRoutes.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);
routerAuth.post("/login", loginUser);

export default routerAuth;

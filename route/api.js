import express from "express";
import * as movieController from "../controller/movieController.js";
import * as userController from "../controller/userController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const api = express.Router();

// Public Router (Auth)
api.post("/signin", userController.signIn);
api.post("/signup", userController.signUp);

// Protected Router (Movies)
api.get("/movie",authenticateTokenMiddleware, movieController.listMovie);
api.get("/movie/:id",authenticateTokenMiddleware, movieController.getMovieById);
api.post("/movie",authenticateTokenMiddleware, movieController.addListMovie);
api.put("/movie/:id",authenticateTokenMiddleware, movieController.updateDataMovie);
api.delete("/movie/:id",authenticateTokenMiddleware, movieController.deleteMovie);

export default api;
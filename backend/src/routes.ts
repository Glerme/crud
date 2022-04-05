import { Router } from "express";

import {
  createComment,
  deleteComment,
  getAllComments,
  getOneComment,
  updateComment,
} from "./controllers/CommentsControllers";

import {
  createGame,
  deleteGame,
  getAllGames,
  getOneGame,
  updateGame,
} from "./controllers/GameControllers";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "./controllers/UserControllers";

const router = Router();

// User
router.post("/user", async (req, res) => {
  createUser(req, res);
});

router.get("/user", async (req, res) => {
  getAllUsers(req, res);
});

router.get("/user/:userId", async (req, res) => {
  getOneUser(req, res);
});

router.patch("/user/:userId", async (req, res) => {
  updateUser(req, res);
});

router.delete("/user/:userId", async (req, res) => {
  deleteUser(req, res);
});

//Game
router.post("/games", async (req, res) => {
  createGame(req, res);
});

router.get("/games", async (req, res) => {
  getAllGames(req, res);
});

router.get("/games/:gameId", async (req, res) => {
  getOneGame(req, res);
});

router.patch("/games/:gameId", async (req, res) => {
  updateGame(req, res);
});

router.delete("/games/:gameId", async (req, res) => {
  deleteGame(req, res);
});

//Comments
router.post("/comments/:gameId/:userId", async (req, res) => {
  createComment(req, res);
});

router.get("/comments", async (req, res) => {
  getAllComments(req, res);
});

router.get("/comments/:commentId", async (req, res) => {
  getOneComment(req, res);
});

router.patch("/comments/:commentId", async (req, res) => {
  updateComment(req, res);
});

router.delete("/comments/:commentId", async (req, res) => {
  deleteComment(req, res);
});

export { router };

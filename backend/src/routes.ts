import { Router } from "express";
import { createAvatar, getAvatar } from "./controllers/AvatarControllers";

import {
  createComment,
  deleteComment,
  getAllComments,
  getOneComment,
  updateComment,
} from "./controllers/CommentsControllers";
import { createGameAvatar, getGameAvatar } from "./controllers/GameAvatar";

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

import { uploadAvatar } from "./functions/uploadAvatar";
import { uploadGameAvatar } from "./functions/uploadGameAvatar";

const router = Router();

// Avatar
router.post("/avatar", uploadAvatar.single("file"), async (req, res) => {
  await createAvatar(req, res);
});

router.get("/avatar/:avatarId", async (req, res, next) => {
  await getAvatar(req, res, next);
});

// Game Avatar
router.post(
  "/gameAvatar",
  uploadGameAvatar.single("file"),
  async (req, res) => {
    await createGameAvatar(req, res);
  }
);

router.get("/gameAvatar/:gameAvatarId", async (req, res, next) => {
  await getGameAvatar(req, res, next);
});

// User
router.post("/user", async (req, res) => {
  await createUser(req, res);
});

router.get("/user", async (req, res) => {
  await getAllUsers(req, res);
});

router.get("/user/:userId", async (req, res) => {
  await getOneUser(req, res);
});

router.patch("/user/:userId", async (req, res) => {
  await updateUser(req, res);
});

router.delete("/user/:userId", async (req, res) => {
  await deleteUser(req, res);
});

//Game
router.post("/games", async (req, res) => {
  await createGame(req, res);
});

router.get("/games", async (req, res) => {
  await getAllGames(req, res);
});

router.get("/games/:gameId", async (req, res) => {
  await getOneGame(req, res);
});

router.patch("/games/:gameId", async (req, res) => {
  await updateGame(req, res);
});

router.delete("/games/:gameId", async (req, res) => {
  await deleteGame(req, res);
});

//Comments
router.post("/comments/:gameId/:userId", async (req, res) => {
  await createComment(req, res);
});

router.get("/comments", async (req, res) => {
  await getAllComments(req, res);
});

router.get("/comments/:commentId", async (req, res) => {
  await getOneComment(req, res);
});

router.patch("/comments/:commentId", async (req, res) => {
  await updateComment(req, res);
});

router.delete("/comments/:commentId", async (req, res) => {
  await deleteComment(req, res);
});

export { router };

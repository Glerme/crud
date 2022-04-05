import fs from "fs";
import path from "path";
import contentDisposition from "content-disposition";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGameAvatar = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const file = req.file;

    const gameAvatar = await prisma.gameAvatar.create({
      data: {
        name: file.filename,
        url: file.path,
        mimeType: file.mimetype,
      },
    });

    return res.status(201).json(gameAvatar);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getGameAvatar = async (
  req: Record<string, any>,
  res: Record<string, any>,
  next: any
) => {
  const { gameAvatarId } = req.params;

  const { inline } = req.query;

  const avatar = await prisma.gameAvatar.findUnique({
    where: { name: gameAvatarId },
  });

  if (!avatar) {
    return res.status(404).json({ error: "Game Avatar not found" });
  }

  const readStream = fs.createReadStream(
    path.join(__dirname, "../uploads/games", avatar.name)
  );

  readStream.on("error", (err) => next(err));

  readStream.pipe(
    res
      .header(
        "Content-Disposition",
        contentDisposition(avatar?.name, {
          type: `${inline ? "inline" : "attachment"}`,
        })
      )
      .header("Cache-Control", "public, max-age=31557600, immutable")
      .contentType("image/jpg")
      .status(200)
  );
};

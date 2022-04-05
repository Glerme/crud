import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGame = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { name, description, comments } = req.body;

    const game = await prisma.game.create({
      data: {
        name,
        description,
        comments,
      },
      include: {
        comments: true,
      },
    });

    return res.status(201).json(game);
  } catch (error) {
    return res.json(500).json(error);
  }
};

export const getAllGames = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        comments: true,
      },
    });

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneGame = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { gameId } = req.params;

    const game = await prisma.game.findUnique({
      where: { gameId: Number(gameId) },
      include: {
        comments: true,
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game não encontrado!" });
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateGame = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { gameId } = req.params;
    const { name, description, comments } = req.body;

    const game = await prisma.game.update({
      where: { gameId: Number(gameId) },
      data: {
        name,
        comments,
        description,
        updatedAt: new Date(),
      },
      include: {
        comments: true,
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game não encontrado!" });
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteGame = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { gameId } = req.params;

    const game = await prisma.game.delete({
      where: { gameId: Number(gameId) },
    });

    if (!game) {
      return res.status(404).json({ message: "Game não encontrado!" });
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json(error);
  }
};

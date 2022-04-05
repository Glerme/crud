import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { gameId, userId } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        gameId: Number(gameId),
        userId: Number(userId),
      },
      include: {
        Game: true,
        User: true,
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllComments = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        Game: true,
        User: true,
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneComment = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { commentId: Number(commentId) },
      include: {
        Game: true,
        User: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado!" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateComment = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.update({
      where: { commentId: Number(commentId) },
      data: {
        content,
      },
      include: {
        Game: true,
        User: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado!" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteComment = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.delete({
      where: { commentId: Number(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado!" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

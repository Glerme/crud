import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { name, email } = req.body;

    const queryUser = await prisma.user.findUnique({ where: { email } });

    if (queryUser) {
      return res.status(400).json({ error: "O usuário já existe" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllUsers = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        comments: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneUser = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        userId: Number(userId),
      },
      include: {
        comments: true,
      },
    });

    if (!user) {
      return res.status(500).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { userId: Number(userId) },
      data: {
        name,
        email,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.delete({
      where: { userId: Number(userId) },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

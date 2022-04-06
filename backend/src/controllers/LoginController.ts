import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signIn = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe!" });
    }

    if (password === user.password) {
      const accessToken = jwt.sign(
        {
          userId: user.userId,
        },
        "secret"
      );

      return res.status(201).json({
        ...user,
        accessToken,
      });
    } else {
      return res.status(400).json({
        message: "Senha incorreta",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

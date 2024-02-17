import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SignIn = async (req, res, next) => {
  try {
    const user = await prisma.prismaClientReader.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.json(createErrors(405, "invalid credentials", false));
    const checkUserPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkUserPassword)
      return res.json(createErrors(404, "invalid credentials", false));
    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.status(200).json({
      status: "user login successfully",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};
export default SignIn;

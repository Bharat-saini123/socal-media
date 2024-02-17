import prisma from "../../database/prisma.js";
import bcrypt from "bcrypt";
import createErrors from "../../Errors/createErrors.js";
const Signup = async (req, res, next) => {
  try {
    const checkUser = await prisma.prismaClientReader.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (checkUser)
      return res.json(createErrors(404, "user already found", false));
    if (
      req.body.password !== req.body.confirmPassword ||
      (!req.body.password && !req.body.confirmPassword)
    )
      return res.json(createErrors(400, "invalid credential", false));

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const hashConfirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);

    const user = await prisma.prismaClientReader.user.create({
      data: {
        ...req.body,
        password: hashPassword,
        confirmPassword: hashConfirmPassword,
      },
    });
    return res.status(200).json({
      status: "user created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
export default Signup;

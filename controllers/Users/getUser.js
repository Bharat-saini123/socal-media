import prisma from "../../database/prisma.js";
const getUser = async (req, res, next) => {
  console.log(typeof req.user.id)
  try {
    const user = await prisma.prismaClientReader.user.findUniqueOrThrow({
      where: {
        id: Number(req.user.id),
      },
    });
    return res.status(200).json({
      success: true,
      status: user,
    });
  } catch (err) {
    next(err);
  }
};
export default getUser;

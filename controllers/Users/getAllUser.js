import prisma from "../../database/prisma.js";

const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await prisma.prismaClientReader.user.findMany({});
    return res.status(200).json({
      success: true,
      getAllUser,
    });
  } catch (err) {
    next(err);
  }
};
export default getAllUser;

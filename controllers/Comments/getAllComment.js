import prisma from "../../database/prisma.js";

const getAllComments = async (req, res, next) => {
  try {
    const getAllComments = await prisma.prismaClientReader.comments.findMany(
      {}
    );
    return res.status(200).json({
      success: true,
      getAllComments,
    });
  } catch (err) {
    next(err);
  }
};
export default getAllComments;

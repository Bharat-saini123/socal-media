import prisma from "../../database/prisma.js";
const getAllPostWithComments = async (req, res, next) => {
  try {
    const getAllUserPost = await prisma.prismaClientReader.post.findMany({
      include: {
        comment: true,
      },
    });
    return res.status(200).json({
      success: true,
      getAllUserPost,
    });
  } catch (err) {
    next(err);
  }
};
export default getAllPostWithComments;

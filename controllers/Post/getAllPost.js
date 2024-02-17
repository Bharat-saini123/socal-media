import prisma from "../../database/prisma.js";
const getAllPost = async (req, res, next) => {
  try {
    const getAllUserPost = await prisma.prismaClientReader.post.findMany({
        
    });
    return res.status(200).json({
      success: true,
      getAllUserPost,
    });
  } catch (err) {
    next(err);
  }
};
export default getAllPost;

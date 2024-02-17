import prisma from "../../database/prisma.js";
const getUserWithProfileAndPost = async (req, res, next) => {
  try {
    const getUsers = await prisma.prismaClientReader.user.findMany({
      include: {
        profile: {
          select: {
            picture: true,
            title: true,
          },
        },
        post: true,
        profile: true,
      },
    });
    return res.status(200).json({
      success: true,
      getUsers,
    });
  } catch (err) {
    next(err);
  }
};
export default getUserWithProfileAndPost;

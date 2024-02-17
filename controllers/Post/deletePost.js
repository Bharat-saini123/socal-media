import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";

const deletePost = async (req, res, next) => {
  try {
    const findPost = await prisma.prismaClientReader.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!findPost) return res.json(createErrors(404, "post not found", false));
    if (Number(findPost.userId) === Number(req.user.id)) {
      const deletePost = await prisma.prismaClientReader.post.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success: true,
        deletePost,
      });
    } else {
      return res.json(createErrors(405, "you delete only your post", false));
    }
  } catch (err) {
    next(err);
  }
};
export default deletePost;

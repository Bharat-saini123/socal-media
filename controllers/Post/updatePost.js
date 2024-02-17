import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";

const updatePost = async (req, res, next) => {
  try {
    const findPost = await prisma.prismaClientReader.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!findPost) return res.json(createErrors(404, "post not found", false));
    if (Number(findPost.userId) === Number(req.user.id)) {
      const updatedPost = await prisma.prismaClientReader.post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        updatedPost,
      });
    } else {
      return res.json(createErrors(405, "you update only your post",false));
    }
  } catch (err) {
    next(err);
  }
};
export default updatePost;

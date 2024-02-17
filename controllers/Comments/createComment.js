import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";
const createComment = async (req, res, next) => {
  try {
    const getPost = await prisma.prismaClientReader.post.findUniqueOrThrow({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!getPost) return res.json(createErrors(400, "post not found", false));
    const comment = await prisma.prismaClientReader.comments.create({
      data: {
        postId: Number(req.params.id),
        userId: Number(req.user.id),
        ...req.body,
      },
    });
    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (err) {
    next(err);
  }
};
export default createComment;

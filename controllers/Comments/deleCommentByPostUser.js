import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";
const deleteCommentByPostUser = async (req, res, next) => {
  try {
    const findComment =
      await prisma.prismaClientReader.comments.findUniqueOrThrow({
        where: {
          id: Number(req.params.id),
        },
      });
    if (!findComment)
      return res.json(createErrors(404, "no comments found", false));
    const findUserPost = await prisma.prismaClientReader.post.findFirst({
      where: {
        id: Number(findComment.postId),
      },
    });
    if (Number(findUserPost.userId) === Number(req.user.id)) {
      const deleteComments = await prisma.prismaClientReader.comments.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success:true,
        deleteComments,
      })
    } else {
      return res.json(
        createErrors(406, "only post author delete the post", false)
      );
    }
  } catch (err) {
    next(err);
  }
};
export default deleteCommentByPostUser;

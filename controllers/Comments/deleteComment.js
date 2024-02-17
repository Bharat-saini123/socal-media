import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";
import createComment from "./createComment.js";

const deleteComment = async (req, res, next) => {
  try {
    const findComment =
      await prisma.prismaClientReader.comments.findUniqueOrThrow({
        where: {
          id: Number(req.params.id),
        },
      });
    if (!findComment)
      return res.json(createComment(404, "comment not found", false));
    if (Number(findComment.userId) === Number(req.user.id)) {
      const deleteComments = await prisma.prismaClientReader.comments.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success: true,
        deleteComments,
      });
    } else {
        return res.json(createErrors(404,"you delete only your comments",false));
    }
  } catch (err) {
    next(err);
  }
};
export default deleteComment;

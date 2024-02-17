import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";

const updateComment = async (req, res, next) => {
  try {
    const findComment =
      await prisma.prismaClientReader.comments.findUniqueOrThrow({
        where: {
          id: Number(req.params.id),
        },
      });
    if (!findComment)
      return res.json(createErrors(404, "comment not found", false));
    if (Number(findComment.userId) === Number(req.user.id)) {
      const updateComment = await prisma.prismaClientReader.comments.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        updateComment,
      });
    } else {
      return res.json(createErrors(404, "you update only your comments",false));
    }
  } catch (err) {
    next(err);
  }
};
export default updateComment;

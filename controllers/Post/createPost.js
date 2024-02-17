import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";

const createPost = async (req, res, next) => {
  try {
    if (Number(req.params.id) === Number(req.user.id)) {
      const post = await prisma.prismaClientReader.post.create({
        data: {
          userId: Number(req.params.id),
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        post,
      });
    } else {
      return res.json(createErrors(500, "you created only your post",false));
    }
  } catch (err) {
    next(err);
  }
};
export default createPost;

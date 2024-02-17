import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";
const getOneUserPost = async (req, res, next) => {
  try {
    if (Number(req.params.id) === Number(req.user.id)) {
      const getPost = await prisma.prismaClientReader.post.findMany({
        where: {
          userId: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success: true,
        getPost,
      });
    } else {
      return res.json(createErrors(404, "you see only your post", false));
    }
  } catch (err) {
    next(err);
  }
};
export default getOneUserPost;

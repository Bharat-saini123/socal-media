import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";
const deleteUser = async (req, res, next) => {
  try {
    if (Number(req.user.id) === Number(req.params.id)) {
      const deleteUser = await prisma.prismaClientReader.user.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success: true,
        deleteUser,
      });
    } else {
      return res.json(
        createErrors(405, "you deleted only your account", false)
      );
    }
  } catch (err) {
    next(err);
  }
};
export default deleteUser;

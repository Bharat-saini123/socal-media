import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";
const updateUser = async (req, res, next) => {
  console.log(typeof req.params.id);
  try {
    if (Number(req.user.id) === Number(req.params.id)) {
      const updatedUser = await prisma.prismaClientReader.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        updatedUser,
      });
    } else {
      return res.json(createErrors(406, "you updated only your account"));
    }
  } catch (err) {
    next(err);
  }
};
export default updateUser;

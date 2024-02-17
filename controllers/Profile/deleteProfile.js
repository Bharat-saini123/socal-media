import createErrors from "../../Errors/createErrors.js";
import prisma from "../../database/prisma.js";
const deleteProfile = async (req, res, next) => {
  try {
    const findProfile =
      await prisma.prismaClientReader.profile.findFirstOrThrow({
        where: {
          id: Number(req.params.id),
        },
      });
    if (!findProfile)
      return res.json(createErrors(404, "user not found", false));
    if (Number(findProfile.userId) === Number(req.user.id)) {
      const deleteProfileData = await prisma.prismaClientReader.profile.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({
        success: true,
        deleteProfileData,
      });
    } else {
      return res.json(createErrors(406, "you delete only your account", false));
    }
  } catch (err) {
    next(err);
  }
};
export default deleteProfile;

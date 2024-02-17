import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";

const updateProfile = async (req, res, next) => {
  try {
    const findProfile = await prisma.prismaClientReader.profile.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!findProfile)
      return res.json(createErrors(405, "your id incorrect", false));

    if (Number(findProfile.userId) === Number(req.user.id)) {
      const updateProfileData = await prisma.prismaClientReader.profile.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        updateProfileData,
      });
    } else {
      return res.json(createErrors(404, "you update only your profile", false));
    }
  } catch (err) {
    next(err);
  }
};
export default updateProfile;

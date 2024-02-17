import prisma from "../../database/prisma.js";
import createErrors from "../../Errors/createErrors.js";

const createProfile = async (req, res, next) => {
  try {
    if (Number(req.params.id) === Number(req.user.id)) {
      const profile = await prisma.prismaClientReader.profile.create({
        data: {
          userId: Number(req.params.id),
          ...req.body,
        },
      });
      return res.status(200).json({
        success: true,
        profile,
      });
    } else {
      return res.json(
        createErrors("404", "you created only your profile", false)
      );
    }
  } catch (err) {
    next(err);
  }
};
export default createProfile;

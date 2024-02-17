import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import jwt from "jsonwebtoken";
import createErrors from "../../Errors/createErrors.js";

const Authentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.json(createErrors(402, "user not authenticate", false));
    await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.json(createErrors(403, "token not valid", false));
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
export default Authentication;

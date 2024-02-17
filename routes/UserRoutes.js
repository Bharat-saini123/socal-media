import express from "express";
import getUser from "../controllers/Users/getUser.js";
import Authentication from "../controllers/Auth/Authentication.js";
import updateUser from "../controllers/Users/updateUser.js";
import deleteUser from "../controllers/Users/deleteUser.js";
import getAllUser from "../controllers/Users/getAllUser.js";
import getAllUserWithProfiles from "../controllers/Users/getAllUserWithProfile.js";
import getAllUserWithPost from "../controllers/Users/getAllUserWithPost.js";
import getUserWithProfileAndPost from "../controllers/Users/getUserWithProfileAndPost.js";

const router = express.Router();

router.get("/getUser", Authentication, getUser);
router.put("/update/:id", Authentication, updateUser);
router.delete("/delete/:id", Authentication, deleteUser);
router.get("/getAllUser",getAllUser);
router.get("/getUserWithProfile",getAllUserWithProfiles);
router.get("/getUserWithPost",getAllUserWithPost);
router.get("/getUserWithAndPost",getUserWithProfileAndPost);
export default router;

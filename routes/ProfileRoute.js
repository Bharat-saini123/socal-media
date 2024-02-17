import express from "express";
import createProfile from "../controllers/Profile/createProfile.js";
import Authentication from "../controllers/Auth/Authentication.js";
import updateProfile from "../controllers/Profile/updateProfile.js";
import deleteProfile from "../controllers/Profile/deleteProfile.js";

const router = express.Router();

router.post("/create/:id", Authentication, createProfile);
router.put("/update/:id", Authentication, updateProfile);
router.delete("/delete/:id", Authentication, deleteProfile);

export default router;

import express from "express";
import Signup from "../controllers/Auth/Signup.js";
import SignIn from "../controllers/Auth/SignIn.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signIn", SignIn);

export default router;

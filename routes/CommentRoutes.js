import express from "express";
import Authentication from "../controllers/Auth/Authentication.js";
import createComment from "../controllers/Comments/createComment.js";
import updateComment from "../controllers/Comments/updateComment.js";
import deleteComment from "../controllers/Comments/deleteComment.js";
import deleteCommentByPostUser from "../controllers/Comments/deleCommentByPostUser.js";
import getAllComments from "../controllers/Comments/getAllComment.js";
const router = express.Router();
router.post("/create/:id", Authentication, createComment);
router.get("/getAllComments",getAllComments);
router.put("/update/:id", Authentication, updateComment);
router.delete("/delete/:id", Authentication, deleteComment);
router.delete("/deleteByUser/:id", Authentication, deleteCommentByPostUser);

export default router;

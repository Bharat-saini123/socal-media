import express from "express";
import Authentication from "../controllers/Auth/Authentication.js";
import createPost from "../controllers/Post/createPost.js";
import updatePost from "../controllers/Post/updatePost.js";
import deletePost from "../controllers/Post/deletePost.js";
import getOneUserPost from "../controllers/Post/getAllOneUserPost.js";
import getAllPost from "../controllers/Post/getAllPost.js";
import getAllPostWithComments from "../controllers/Post/getAllPostWithComments.js";

const router = express.Router();

router.post("/createPost/:id", Authentication, createPost);
router.put("/update/:id", Authentication, updatePost);
router.delete("/delete/:id", Authentication, deletePost);
router.get("/getOneAuthUserPost/:id", Authentication, getOneUserPost);
router.get("/getAllUserPost", getAllPost);
router.get("/getAllPostWithComments", getAllPostWithComments);

export default router;

import express from 'express';
import { getPosts, getPost, createPost, updatePost, likePost, commentPost, deletePost, deleteAllPost } from '../controllers/posts.js';
import chkuser from '../middlewares/auth.js';

const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/add", chkuser, createPost)
router.put("/edit/:id", chkuser, updatePost)
router.delete("/delete/all", chkuser, deleteAllPost)
router.delete("/delete/:id", chkuser, deletePost)
router.get("/like/:id", chkuser, likePost)
router.post("/comment/:id", chkuser, commentPost)

export default router
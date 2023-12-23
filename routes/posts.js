import express from 'express';
import { getPosts, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';
import chkuser from '../middlewares/auth.js';

const router = express.Router();

router.get("/", getPosts)
router.post("/add", chkuser, createPost)
router.put("/edit/:id", chkuser, updatePost)
router.delete("/delete/:id", chkuser, deletePost)
router.get("/like/:id", chkuser, likePost)
router.post("/comment/:id", chkuser, commentPost)

export default router
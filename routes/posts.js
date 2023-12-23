import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
import chkuser from '../middlewares/auth.js';

const router = express.Router();

router.get("/", getPosts)
router.post("/add", chkuser, createPost)

export default router
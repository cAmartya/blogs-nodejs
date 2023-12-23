import express from 'express';

import Posts from '../models/posts.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    
  // console.log("get posts", req);
  
  const { page } = req.query || 1;
  const LIMIT = 10;
  const startIdx = (Number(page)-1) * LIMIT;
  
  try {
      const total = await Posts.countDocuments({});
      const posts = await Posts.find().sort({_id: -1}).limit(LIMIT).skip(startIdx);
      
      res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Posts({ ...post, userName: req.userName, creator: req.userId, createdAt: new Date().toISOString() })

  try {
      await newPost.save();

      res.status(201).json(newPost);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}


export default router;
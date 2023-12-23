import express from 'express';
import mongoose from 'mongoose';
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

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, message, tags, _id: id };

  await Posts.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Posts.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;    
  
  if(!req.userId) return res.status(404).json({ message: 'Unauthenticated'})

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
      
  const post = await Posts.findById(id);
  
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if(index === -1)    {
      post.likes.push(req.userId);
  }else   {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost);
}

export const commentPost = async (req, res) => {
  const { id } = req.params;    
  const { value } = req.body;
  if(!req.userId) return res.status(404).json({ message: 'Unauthenticated'})

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
      
  const post = await Posts.findById(id);
  
  post.comments.push(value);

  const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost);
}


export default router;
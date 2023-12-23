
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

import postRoutes from './routes/posts.js';
// import userRoutes from './routes/user.js';

import connectToMongo from './db.js';
connectToMongo();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Server is Live and Running");
});

app.use('/posts', postRoutes);
// app.use('/user', userRoutes);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/users.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "AMAZING PROJECT";


export const signup = async (req, res) => {
    let success = false;

    const { userName, email, password} = req.body;
    console.log("signup users", userName, email, password)

    try {
        let existingUser = await User.findOne({userName : userName});
        if(existingUser)   {
            return res.status(400).json({success, error : "User already exists with same username."});
        }

        existingUser = await User.findOne({email : email});
        if(existingUser)   {
            return res.status(400).json({success, error : "User Account already exists for this email."});
        }

        const salt = await bcrypt.genSaltSync(10);    
        const secPass = await bcrypt.hash(password, salt);
        const user = await User.create({userName, email, password: secPass});
        
        // const user = new User(userName, email, password: secPass);
        // await user.save();        

        const token = jwt.sign({userName: userName, id: user._id}, JWT_SECRET_KEY);
        success = true;
        res.status(200).json({result: user, token, success})

    } catch (error) {
        console.error(error);
        res.status(500).send("Some unprecedented Internal Server error occured");
    }

}
export const signin = async (req, res) => {
    let success = false;
    
    const { userName, password} = req.body;
    console.log("signin users", userName, password)

    try {
        const existingUser = await User.findOne({userName: userName});
        if(!existingUser)   {
            return res.status(404).json({error : "User Account not found."});
        }

        const chkpass = await bcrypt.compare(password, existingUser.password);
        if(!chkpass)   {
            return res.status(404).json({error : "Invalid credentials."});
        }

        const token = jwt.sign({userName: userName, id: existingUser._id}, JWT_SECRET_KEY);
        success = true;
        res.status(200).json({result: existingUser, token, success})

    } catch (error) {
        console.error(error);
        res.status(500).send("Some unprecedented Internal Server error occured");
    }

}
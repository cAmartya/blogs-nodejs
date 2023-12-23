import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    id: {type: String},
    createdAt: { type: Date, default: new Date()}
})

var User = mongoose.model('User', userSchema);

export default User;
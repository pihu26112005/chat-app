import dotenv from 'dotenv';
dotenv.config();
import User from "../Models/userModel.js";
// rest of your code
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userRegister = async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            pic: pic || undefined // If pic is not provided, mongoose will use the default value
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // res.status(200).json({ success: true, token });
        return res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            pic: newUser.pic,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: token,
          });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const verifyToken = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    // if (!token) {
    //     return res.status(400).json({ success: false });
    // }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}


const getAllUser = async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}



export { userLogin, userRegister, verifyToken, getAllUser };
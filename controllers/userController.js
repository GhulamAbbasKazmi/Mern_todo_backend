const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456qwertyuio'; 

// Register a new user
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new UserModel({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred', details: err });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create a token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        const userId = user._id

        res.json({ token, userId });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred', details: err });
    }
};

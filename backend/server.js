const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error', error.message);
});


const port = process.env.PORT || 5000;


// User model
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const User = mongoose.model('User', UserSchema);


// Signup endpoint
app.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({userId: user._id}, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.json({token});
        console.log(token)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});
const bookmarkRoutes = require('./routes/bookmarks');

app.use('/api/bookmarks', bookmarkRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

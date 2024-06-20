const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({userId: req.params.userId});
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Add a new bookmark
router.post('/', authenticateToken, async (req, res) => {
    const bookmark = new Bookmark({
        userId: req.body.userId,
        movieId: req.body.movieId,
        title: req.body.title,
        backdropPath: req.body.backdropPath,
        releaseYear: req.body.releaseYear,
    });

    try {
        const newBookmark = await bookmark.save();
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Delete a bookmark
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        if (!deletedBookmark) {
            return res.status(404).json({message: 'Bookmark not found'});
        }
        res.json({message: 'Bookmark deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;

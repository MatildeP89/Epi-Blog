const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

//GET

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        // Aggiungi il filtro per autore se presente
        const filter = {};

        // Conta il totale dei post
        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        // Ottieni i post paginati
        const posts = await Post.find(filter)
            .populate("author", "firstName lastName")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Ordina per data di creazione, più recenti prima

        res.json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstName lastName");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});


//POST
router.post("/", async (req, res) => {
    try {
        const { title, category, cover, content, readTime, author } = req.body;

        const newPost = new Post({
            title,
            category,
            cover,
            content,
            readTime,
            author
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//PUT

router.put("/:id", async (req, res) => {

    try {
        const { title, category, cover, content, readTime } = req.body;

        const post = await Post.findByIdAndUpdate(req.params.id,
            {
                title,
                category,
                cover,
                content,
                readTime
            });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//DELETE


router.delete("/:id", async (req, res) => {

    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
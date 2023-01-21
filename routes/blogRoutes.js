const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const cleanCache = require('../middlewares/cleanCache');
const router = require('express').Router();
// we didn't export that's why we called the blog
// like this
const Blog = mongoose.model('Blog');

 router.get('/test', async (req, res) => {
    console.log(req.headers);
    console.log("Router hitted");
    res.send({"test": "hello"});
 })

 router.get('/blogs', requireLogin, async (req, res) => {    
    const blogs = await Blog.find({_user: req.user.id }).cache({ key: req.user.id })

    res.send(blogs);
 });

 router.post('/blogs', requireLogin, cleanCache, async(req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
        title,
        content,
        _user: req.user.id
    });

    try{
        await blog.save();
        res.send(blog);
    } catch (err){
        res.send(400, err);
    }
 })

 router.get('/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
        _user: req.user.id,
        _id: req.params.id
    });

    res.send(blog);
 });


module.exports = router;
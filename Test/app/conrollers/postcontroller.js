const Post = require('../models/postmodel');
module.exports = {
    index: (req, res) => {
        Post.find({}).lean().then((posts) => {
            res.render('Blog/blog', { posts: posts })
        }).catch((err) => {
            res.send(err)
        })
    },

    post: (req, res) => {
        Post.findById(req.params.id).then((post) => {
            res.render('Blog/singlepost', post)
        }).catch((err) => {
            res.send(err);
        })
    },

    create: (req, res) => {
        const newpost = new Post({...req.body});
        newpost.save();

        res.redirect('/blog')
    },
    editform: (req, res)=>{
        Post.findById(req.params.id).then((post)=>{
            res.render('Blog/editpost', post)
        }).catch((err)=>{
            res.send(err);
        })
    },
    update: (req,res)=>{
        Post.findByIdAndUpdate(req.params.id, req.body).then((post)=>{
            res.redirect('/blog/' + post._id) 
        }).catch((err)=>{
            res.send(err);
        })
    },
    deletepost: (req, res)=>{
        Post.findByIdAndDelete(req.params.id).then(()=>{
            res.redirect('/blog')
            }).catch((err)=>{
                res.send(err);
        })
    }
};
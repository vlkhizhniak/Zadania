const User = require('../models/UserModel');

module.exports={
    create: (req, res)=>{
        const newuser =User(req.body)
        newuser.save()
        .then(() => res.redirect('/blog'))
        .catch((err)=>{
            if(err.code === 11000){
                res.render('UserViews/signUp',{
                    error: true,
                    message: "User already exist" + err.code,
                    user: req.body
                })
            }
        });

    }
}
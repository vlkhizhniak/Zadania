const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

module.exports = (req, res, next) => {
    const token = req.cookies['AuthToken']
    if(token) {

        try {
            const verified = jwt.verify(token, process.env.TOKEN_KEY);
            User.findById(verified._id).then((user)=> {
                res.locals.userId = user._id;
                res.locals.userName = user.name;
                next();
            })
            .catch((err)=>{
                res.send(err)
            })
           
        } catch {
            res.redirect('/user/login')
        }

        
    } else {
        res.redirect('/user/login')
    }
}
const {
    User
} = require("../database/models");

const middleware = async function (req, res, next){
    
    if (req.cookies.user != undefined && req.session.user == undefined){
        let user = await User.findOne({
            where: {email: req.cookies.user
            }
        });
        if (user == null) return res.redirect("register");
        req.session.user = user;
    };
    
    next();
};

module.exports = middleware;
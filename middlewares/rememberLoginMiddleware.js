const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");

const middleware = function (req, res, next){
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    if (req.cookies.user != undefined && req.session.user == undefined){
        const user = users.find((e) => {
            return (
               e.email == req.cookies.user
            );
        });
        if (user == null) return res.redirect("register");
        req.session.user = user;
    };
    
    next();
};

module.exports = middleware;
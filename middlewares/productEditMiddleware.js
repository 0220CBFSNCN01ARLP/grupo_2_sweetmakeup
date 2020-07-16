let middleware = async function (req, res, next) {
    const { User, Product } = require("../database/models");

    let user = await User.findOne({
        where: {
            email: req.session.user.email,
        },
    });

    let product = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: "user"
    });

    if(user.id == product.user.id){
        return next()
    }
    res.redirect("/")

}

module.exports = middleware
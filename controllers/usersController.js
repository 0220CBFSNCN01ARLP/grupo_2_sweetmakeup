const bcrypt = require("bcrypt");
const { User, Product, Brand} = require("../database/models");

let { check, validationResult, body } = require("express-validator");

let controller = {
  showRegister: async (req, res) => {
    let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("register", { brandsHeader });
  },

  register: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let newUser = await User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatar: req.file.filename,
          roleId: req.body.role,
        });
        req.session.user = newUser;
        res.cookie("user", newUser.email, {
          maxAge: 15*60*1000,
        });
        res.redirect("/");
      } else {
        return res.render("register", {
          errors: errors.errors,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  login: async (req, res, next) => {
    try {
      let user = await User.findOne({
        where: {
          email: req.body.loginEmail,
        },
      });

      if (!user) {
        let brandsHeader = await Brand.findAll({ limit: 10 });

        return res.render("register", {
          brandsHeader,
          invalidUserMsg: "Usuario incorrecto",
        });
      }

      let correctPw = await bcrypt.compare(
        req.body.loginPassword,
        user.password
      );
      if (!correctPw) {
        let brandsHeader = await Brand.findAll({ limit: 10 });

        user = null;
     
        return res.render("register", {
          brandsHeader,
          invalidPwMsg: "Contraseña incorrecta",
        });
      }
      let cookieAge = 1800000;
      if (req.body.remember != undefined) {
        cookieAge = 1000 * 3600 * 24 * 30;
      }
      req.session.user = user;
      res.cookie("user", user.email, {
        maxAge: cookieAge,
      });
      res.redirect("/");
    } catch (e) {
      console.error(e);
    }
  },

  logout: (req, res, next) => {
    if (req.session.user != null) {
      req.session.destroy(function (err) {
        res.clearCookie("user");
        res.redirect("/");
      });
    } else {
      res.redirect("register");
    }
  },

  userDetail: async (req, res, next) => {
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });
      res.render("userDetail", {
        brandsHeader,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },
  userEdit: async (req, res, next) => {
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });
    res.render("userEdit", {
      brandsHeader,
      user: req.session.user,
    });
    } catch (error) {
      console.error(error)
    }
    
  },
  userEditPassword: async (req, res, next) => {
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("userEditPassword", {
      brandsHeader,
      user: req.session.user,
    });
    } catch (error) {
      console.error(error)
    }
  },

  userUpdate: async (req, res, next) => {
    try {
      let avatar
      if(req.files.length > 0){
        avatar = req.files[0].filename
      } else {
        avatar = req.session.user.avatar
      }
      await User.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          avatar: avatar
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      let user = await User.findByPk(req.params.id)
      req.session.user = user;
      res.redirect("/users/admin");
    } catch (error) {
      console.error(error)
    }
  },

  userUpdatePassword: async (req, res, next) => {
    try {
      await User.update(
        {
          password: bcrypt.hashSync(req.body.password, 10),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      req.session.user.password = req.body.password;
      res.redirect("/users/admin");
    } catch (e) {
      console.error(e);
    }
  },
  myProducts: async (req, res, next) => {
    try {
      let user = req.session.user;
      if (!user) {
        res.redirect("/users/register");
      }
      let products = await Product.findAll({
        where: {
          userId: user.id,
        },
        include: "images",
      });
      let brandsHeader = await Brand.findAll({ limit: 10 });

      res.render("myProducts", {
        products,
        brandsHeader,
        user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;

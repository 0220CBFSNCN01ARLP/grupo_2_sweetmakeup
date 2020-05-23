let controller = {
    index: function (req, res, next) {
        res.render("index");
      },
    register: function (req, res, next) {
        res.render("register");
      },
    cart: function (req, res, next) {
        res.render("productCart");
      },
    ojos: function (req, res, next) {
        res.render("section", { title: "ojos", subsections: ["mascara", "delineador", "sombra"] });
      },
    rostro: function (req, res, next) {
        res.render("section", { title: "rostro", subsections: ["base en polvo", "base en crema", "iluminador", "concealer"] });
      },
    cejas: function (req, res, next) {
        res.render("section", { title: "cejas", subsections: ["perfilador", "rellenador", "fijador", "cepillos"] });
      },
    labios: function (req, res, next) {
        res.render("section", { title: "labios", subsections: ["lápiz labial", "delineador", "brillo labial"] });
      }
};

module.exports = controller;
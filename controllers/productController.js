let controller = {
    detail: function (req, res, next) {
        res.render("productDetail");
      },
    showLoad: function (req, res, next) {
        res.render("productAdd");
      }

};

module.exports = controller;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");

const cookieAuthMiddleware = require("./middlewares/rememberLoginMiddleware");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const brandsRouter = require("./routes/brands");
const tagsRouter = require("./routes/tags");
const apiRouter = require("./routes/api");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const secret = "secret makeu 123";
app.use(cookieParser(secret));
app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieAuthMiddleware);

app.locals.toThousand = function (n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);
app.use("/tags", tagsRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

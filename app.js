require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDB = require("./config");
var usersRouter = require("./routes/users");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const lavageRoutes = require("./routes/lavageRoutes");
const tolerieRoutes = require("./routes/tolerieRoutes");
const polissageRoutes = require("./routes/pollissageRoutes");
const detailingRoutes = require("./routes/detailingRoutes");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

var app = express();

const allowedOrigins = "*";
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
connectDB();

app.use(logger("dev"));
app.use(express.json({ limit: "2gb" }));
app.use(express.urlencoded({ limit: "2gb", extended: true }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/commandes", commandeRoutes);
app.use("/lavages", lavageRoutes);
app.use("/tolerie", tolerieRoutes);
app.use("/polissage", polissageRoutes);
app.use("/detailing", detailingRoutes);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

module.exports = app;

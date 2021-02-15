const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const authRouter = require("./routes/auth");
const searchRouter = require("./routes/busquedas");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);

module.exports = app;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const apiRouter = require("./routes/apiRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();

app.use(logger("dev"));

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", apiRouter);

app.use(errorHandler);

module.exports = app;

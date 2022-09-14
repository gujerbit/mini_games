import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";
import history from "connect-history-api-fallback";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";

// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const history = require("connect-history-api-fallback");
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app = express();
const port = 3001;
const __dirname = path.resolve();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// <routing>
import indexRouter from "./routes/index.js";

app.use('/', indexRouter);
// </routing>

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: [
            "http://localhost:8080",
        ],
    },
});

io.on("connection", (socket) => {
    socket.on("send", (value) => {
        io.emit("message", `${value.userName}: ${value.message}`);
    });
});

http.listen(port, () => {
    console.log(`server on ${port} port started..`);
});
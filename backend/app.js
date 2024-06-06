require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/db')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect();

app.use("/api", routes);

module.exports = app;
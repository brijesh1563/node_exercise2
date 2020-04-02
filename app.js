const winston = require('winston')
require('winston-mongodb');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const error = require('./middleware/error');
const cars = require('./routes/cars');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

bodyParser.json()

process.on('uncaughtException', (err) => {
    winston.error(err.message, err);
});

winston.add(winston.transports.File, { filename: 'file.log' }); 

mongoose.connect("mongodb://localhost/NodeExercise2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connecting to mongoDB..."))
    .catch(err => console.log(" can not Connected to mongoDB...", err.message));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use('/cars', cars);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
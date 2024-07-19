const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const apiRouter = require('./routes/api/contactsRouter');

const usersRouter = require("./routes/api/usersRouter");

const dotenv = require('dotenv');

// require("./config/config-passport");

// const { default: setJWTStrategy } = require('./config/jwt');


// const contactsRouter = require('./routes/api/contacts')


dotenv.config()

const { DB_HOST: urlDb } = process.env;
console.log(urlDb);
const connection = mongoose.connect(urlDb);

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// setJWTStrategy();

app.use('/api', apiRouter)
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
})

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        return res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message || 'Something went wrong' });
    }
})

const startServer = async () => {
    try{
        await connection;
        console.log('Database connected');
        app.listen(8000, () => {
            console.log('Server started on http://localhost:8000');
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

startServer();




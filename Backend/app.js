const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors');
const app = express();
const cookireParser = require('cookie-parser');
const ConnectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
ConnectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookireParser());

app.get('/',(req, res)=>{
    res.send('Hello World')
})

app.use('/users',userRoutes);

app.use('/captains',captainRoutes);

module.exports = app;
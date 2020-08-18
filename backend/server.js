const express =  require('express')
const ConnectDB = require('./config/db')
const app = express()
const cors = require("cors");
const bodyparser = require("body-parser");
ConnectDB()

app.use(express.json({ extended: true}))
app.use(cors());
app.use(bodyparser.json());

app.use('/register' , require('./routes/register'))
app.use('/login' , require('./routes/auth'))
app.use('/product' , require('./routes/product'))

const startServer = () => {
    app.listen({port: 5000},() =>console.log('Server is Ready '))
}

startServer()

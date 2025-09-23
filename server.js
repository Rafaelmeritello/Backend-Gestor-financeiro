const express = require('express')
require('dotenv').config()
const app = express()
const route_entry = require('./Routes/route_entry')
const finan_routes = require('./Routes/finan_routes')
const porta = process.env.PORTA;
const router = express.Router()
const {db} = require('./DB/database')
const jwt = require('jsonwebtoken');
const database_utils = require('./Controllers/database_util')
app.use(express.json());

app.use('/', route_entry)
app.use('/finan_routes', finan_routes)



app.listen(porta, async () => {
 await database_utils.conectarMongo()

    console.log(`App de exemplo esta rodando na porta ${porta}`)
  })
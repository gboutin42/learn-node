// server express
const express = require('express')

// Middlewares
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

// ORM
const sequelize = require('./src/db/sequelize')

// Server initialization
const app = express()
const port = 3000

/**
 * Custom Middleware
 * Middleware to log some informations
*/
// // Middelware declaration
// const logger = (req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// }
// // Using of middleware
// app.use(logger)

/**
 * Using middlewares
 * favicon: to add a favicon
 * morgan: to have some logs in the console when we are in dev mode
 * bodyParser to uniformize data in json format
 */
app.use(favicon(__dirname + '/images/favicon/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

// Database initialisation
sequelize.initDb()

// Endpoints
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// Server listener on the port
app.listen(port, () => console.log(`Our Node application is start on : http://localhost:${port}`))

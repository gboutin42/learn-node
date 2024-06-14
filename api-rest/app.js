const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success } = require('./helper')
const pokemons = require('./db/mock-pokemon')

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
 */
app.use(favicon(__dirname + '/images/favicon/favicon.ico'))
    .use(morgan('dev'))

// Endpoints
app.get('/', (req, res) => res.send('Hello Express 2 ! '))
app.get('/api/pokemons', (req, res) => {
    const message = "La liste des pokémons a bien été récupérée."

    // response in json format and use of success module from the helper
    res.json(success(message, pokemons))
})
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokémon a bien été trouvé."

    // response in json format and use of success module from the helper
    res.json(success(message, pokemon))
})

// Server listener on the port
app.listen(port, () => console.log(`Our Node application is start on : http://localhost:${port}`))

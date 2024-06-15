// server express
const express = require('express')

// Middlewares
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

// ORM
const { Sequelize } = require('sequelize')

// Tools
const { success, getUniqueId } = require('./helper')

// mock-pokemon
let pokemons = require('./db/mock-pokemon')

// Server initialization
const app = express()
const port = 3000

// Instansation of Sequelize ORM
const { config } = require('./db/config')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

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
    .use(bodyParser.json())

// Endpoints
app.get('/', (req, res) => res.send('Hello Express 2 ! '))

// get all data from pokemons
app.get('/api/pokemons', (req, res) => {
    const message = "La liste des pokémons a bien été récupérée."

    // response in json format and use of success module from the helper
    res.json(success(message, pokemons))
})

// get a specific data from pokemons for a given id
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokémon a bien été trouvé."

    // response in json format and use of success module from the helper
    res.json(success(message, pokemon))
})

// create new data in pokemons
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} à bien été créé.`
    res.json(success(message, pokemonCreated))
})

// edit data in pokemons for a given id
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} à bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

// remove data in pokemons for a given id
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} à bien été supprimé.`
    res.json(success(message, pokemonDeleted))
})

// Server listener on the port
app.listen(port, () => console.log(`Our Node application is start on : http://localhost:${port}`))

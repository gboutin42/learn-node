// ORM
const { Sequelize, DataTypes } = require('sequelize')
// Model pokemon
const PokemonModel = require('../models/pokemon')
// mock-pokemon
const pokemons = require('./mock-pokemon')

// Instanciation of Sequelize ORM
const { config } = require('./config')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        dialectOptions: {
            useUTC: false
        },
        timezone: '+02:00',
        logging: true
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                }).then(pokemonCreated => console.log(pokemonCreated.toJSON()))
            })
            console.log('La connexion à la base de données a bien été initialisée.')
        })
        .catch(error => console.error(`Erreur de synchronisation de la base de données : ${error}`))
}

module.exports = { initDb, Pokemon }
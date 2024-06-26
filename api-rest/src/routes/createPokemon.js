const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokémon ${pokemon.name} a bien été créé.`
                res.json({ message, data: pokemon })
            })
            .catch(err => {
                const message = "Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants."
                res.status(500).json({ message, data: err })
            })
    })
}
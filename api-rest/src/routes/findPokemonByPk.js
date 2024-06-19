const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = "Un pokémon a été trouvé."
                res.json({ message, data: pokemon })
            })
    })
}
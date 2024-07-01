const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        if (pokemon === null) {
                            const message = "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant."
                            return res.status(404).json({ message })
                        }
                        const message = `Le pokemon ${pokemon.name} a été mis à jour.`
                        res.json({ message, data: pokemon })
                    })
            })
            .catch(err => {
                const message = "Le pokemon n'a pas pu être modifié. Réessayez dans quelques instants."
                res.status(500).json({ message, data: err })
            })
    })
}
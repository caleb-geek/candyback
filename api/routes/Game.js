const express = require('express');
const Router = express.Router();
const { checkToken } = require('../middlewares/Auth')

const {createGame,deleteGame,getAllGames,getGame} = require('../controllers/Game');

Router.post('/', createGame)
Router.get('/', getAllGames)
Router.get('/:id', getGame)
//Router.put('/:id',deleteGame)
Router.delete('/:id', deleteGame)

module.exports = Router;
const express = require('express');
const Router = express.Router();
const { checkToken } = require('../middlewares/Auth')

const {
    createInitialScore,
    getGameScores,
    reviveOrKillPlayer,
    increasePlayerScore
} = require('../controllers/Score');

Router.post('/', createInitialScore)
//Router.get('/', getAllGames)
Router.get('/:id', getGameScores)
Router.put('/status/:userId/:gameId',reviveOrKillPlayer)
Router.put('/addkill/:userId/:gameId',increasePlayerScore)
//Router.delete('/:id', deleteGame)

module.exports = Router;
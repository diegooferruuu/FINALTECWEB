const express = require('express');
const PlayerRouter = express.Router();
const PlayerController = require('../Controllers/Player.controller');


PlayerRouter.get('/', PlayerController.getAllPlayers);
PlayerRouter.get('/name/:name', PlayerController.getPlayerByName);
PlayerRouter.get('/filter/', PlayerController.getPlayerFiltered);


PlayerRouter.post('/', PlayerController.createNewPlayer);

PlayerRouter.delete('/:id', PlayerController.deletePlayerByID);

PlayerRouter.patch('/:id', PlayerController.updatePlayerByID);

module.exports = PlayerRouter;
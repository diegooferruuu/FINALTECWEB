const mongoose = require('mongoose');
const createError = require('http-errors');
const Player = require('../Models/Player.model');

module.exports = {
    getAllPlayers: async(req,res,next) =>{
        try{
            const results = await Player.find({}, {__v:0});
            console.log(results);
            res.send(results);
        } catch(error) {
            console.log(error.message)
        }
    },
    createNewPlayer: async (req, res, next) => {
        try {
            req.body
            // Create and save the Player
            console.log(req.body);
            const newPlayer = new Player(req.body);
            const result = await newPlayer.save();

            res.status(201).send(result);
        } catch (error) {
            console.error(error.message);
            if (error.name === "ValidationError") {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },
    getPlayerByName: async(req,res,next) => {
        const name = req.params.name;
        try{
            const Player = await Player.findOne({name:name});
            if(!Player){
                throw createError(404, "Player Not Found");
            }
            res.json(Player);
        }catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400, "Invalid Name"));
                return;
            }
            next(error);
        }
    },
    getPlayerFiltered: async(req,res,next) => {
        try{
            const filters = {};
            if (req.query.age) {
                filters.age = parseInt(req.query.age, 10);
            }

            if (req.query.minAge && req.query.maxAge) {
            filters.age = { 
                $gte: parseInt(req.query.minAge, 10), 
                $lte: parseInt(req.query.maxAge, 10) 
            };
            }

            if (req.query.nationality) {
            filters.nationality = { $regex: req.query.nationality, $options: 'i' }; // Búsqueda insensible a mayúsculas
            }

            const Players = await Player.find(filters);
            res.status(200).json(Players);
        }catch(error){
            console.log(error.message);
        }
    },

    getPlayerByID: async(req,res,next) => {
        const id = req.params.id;
        try{
            const Player = await Player.findById(id);
            if(!Player){
                throw createError(404, "Player Not Found");
            }
            res.json(Player);
        }catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400, "Invalid Name"));
                return;
            }
            next(error);
        }
    },

    deletePlayerByID: async (req, res, next) => {
        const id = req.params.id;
        try {
            // Check if the Pokémon exists
            const PlayerToDelete = await Player.findById(id);
            if (!PlayerToDelete) {
                throw createError(404, "Player does not exist.");
            }
    
            // Remove references to this Player from other Payer's evolution fields
            await Player.updateMany(
                { "transfers.nextTeams": id },
                { $pull: { "transfers.nextTeams": id } } // Remove from 'next' evolutions
            );
    
            await Player.updateMany(
                { "transfers.previousTeam": id },
                { $set: { "transfers.previousTeam": null } } // Set 'prev' evolution to null
            );
    
            const result = await Player.findByIdAndDelete(id);
    
            res.send(result); // Return deleted Player details
        } catch (error) {
            console.log(error.message);
    
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid ID"));
                return;
            }
            next(error);
        }
    },
    updatePlayerByID: async(req,res,next)=>{
        try {
            const id = req.params.id;
            const updateData = req.body;
            const result = await Player.findOneAndUpdate({ _id: id }, updateData, {new: true});
            if(!result) {
                throw createError(404, "Player does not exist");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid Player ID"));
            }
            next(error);
        }
    }
};
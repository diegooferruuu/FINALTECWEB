const mongoose = require('mongoose');
require('dotenv').config();
const Player = require('./Models/Player.model'); // Ajusta la ruta si es necesario

// Conecta a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
    .then(() => {
        console.log('MongoDB connected successfully');
        
        // Crear un nuevo jugador
        const newPlayer = new Player({
            name: 'Lionel Messi',
            age: 36,
            nationality: 'Argentina',
            positions: "ST, RW",
            value_euro: 50_000_000
        });

        // Guardar el jugador en la base de datos
        return newPlayer.save();
    })
    .then(() => {
        console.log('Player saved!');
        mongoose.connection.close(); // Cierra la conexión después de guardar
    })
    .catch(err => {
        console.error('Error:', err);
        mongoose.connection.close(); // Cierra la conexión incluso si hay un error
    });

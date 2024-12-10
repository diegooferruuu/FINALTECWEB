const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 16, // Mínima edad razonable para un futbolista profesional
        max: 50, // Edad máxima razonable para un jugador activo
    },
    nationality: {
        type: String,
        required: true,
    },
    positions: {
        type: [String], // Permite múltiples posiciones, ej. ['Delantero', 'Extremo']
        required: true,
    },
    value_euro: {
        type: Number,
        required: true,
        min: 0, // Valor mínimo de mercado
    },
    image: {
        type: String,
        // required: true
    }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;

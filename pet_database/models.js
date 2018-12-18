const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nome: String,
    cpf: String,
    email: String,
    senha: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', UserSchema);
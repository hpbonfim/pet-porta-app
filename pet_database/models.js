const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const encode = 10

const UserSchema = mongoose.Schema({
    nome: String,
    cpf: String,
    email: String,
    senha: String,
}, {
    timestamps: true
})
// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.senha = bcrypt.hashSync(this.senha, encode);
    next();
})

module.exports = mongoose.model('Users', UserSchema)
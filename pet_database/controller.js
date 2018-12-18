const User = require('./models.js')

// Create and Save a new usuario
exports.create = (req, res) => {
    // Validate request
    if(!req.body.senha) {
        return res.status(400).send({
            message: "Senha não pode ficar vazia"
        })
    }

    // Create a new user
    const usuario = new User({
        nome: req.body.nome || "teste nome",
        cpf: req.body.cpf || "teste cpf",
        email: req.body.email || "teste email",
        senha: req.body.senha 
    })

    // Save usuario in the database
    usuario.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao salvar novo usuário."
        })
    })
}

// Retrieve and return all usuarios from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(usuarios => {
        res.send(usuarios)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao buscar por usuários."
        })
    })
}

// Acha um unico usuario com o usuarioId
exports.findOne = (req, res) => {
    User.findById(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuário não encontrado com o ID: " + req.params.usuarioId
            })          
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuário não encontrado com o ID: " + req.params.usuarioId
            })               
        }
        return res.status(500).send({
            message: "Erro ao buscar usuário com o ID: " + req.params.usuarioId
        })
    })
}

// Update a usuario identified by the usuarioId in the request
exports.update = (req, res) => {
 // Validate Request
 if(!req.body.senha) {
    return res.status(400).send({
        message: "Senha não pode ficar vazia"
    })
}

// Find usuario and update it with the request body
User.findByIdAndUpdate(req.params.usuarioId, {
    nome: req.body.nome || "teste nome",
    cpf: req.body.cpf || "teste cpf",
    email: req.body.email || "teste email",
    senha: req.body.senha 
}, {new: true})
.then(usuario => {
    if(!usuario) {
        return res.status(404).send({
            message: "Usuário não encontrado com o ID:  " + req.params.usuarioId
        })
    }
    res.send(usuario);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Usuário não encontrado com o ID:  " + req.params.usuarioId
        })             
    }
    return res.status(500).send({
        message: "Erro ao atualizar dados do ID: " + req.params.usuarioId
    })
})
}

// Delete a usuario with the specified usuarioId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuário não encontrado com o ID: " + req.params.usuarioId
            })
        }
        res.send({message: "Usuário deletado com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usuário não encontrado com o ID: " + req.params.usuarioId
            })               
        }
        return res.status(500).send({
            message: "Não foi possivel deletar o ID: " + req.params.usuarioId
        })
    })
}


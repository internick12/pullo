const { Schema, model } = require('mongoose');

const UsuariosSchema = Schema({
    role: { type: String, required: [true, 'El role es obligatorio'] }
});


module.exports = model('Role', UsuariosSchema);
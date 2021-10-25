const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcrypt'); 



const usuariosGet = async(req=request, res=response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado : true };
    
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total = await Usuario.count(query);

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({ total, usuarios});
}

const usuariosPost = async(req, res) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'Post al API',
        usuario
    });
}

const usuariosPut = async(req, res) => {
    const {id}  = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({usuario, usuarioAutenticado});
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }
const { response, request } = require("express");


const usuariosGet = (req=request, res=response) => {
    const { q, nombre } = req.query;

    res.json({
        msg: 'Get al API - Controller',
        q, nombre
    });
}

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post al API',
        nombre, edad
    });
}

const usuariosPut = (req, res) => {
    const {id}  = req.params;

    res.json({
        msg: 'Put al API',
        id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete al API - Controller'
    });
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }
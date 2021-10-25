const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcrypt'); 
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res=response) => {

    const { correo, password } = req.body;

    try {

        //verificar si email existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario){
            res.status(400).json({
                msg: 'El usuario / password no son correctos --correo'
            });
        }

        //verificar que el usuario este activo
        if(!usuario.estado){
            res.status(400).json({
                msg: 'El usuario / password no son correctos --estado'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validPassword){
            res.status(400).json({
                msg: 'El usuario / password no son correctos --password'
            });
        }

        //generar JWT
        const token = await generarJWT( usuario.id );


        res.json({
           usuario, token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'algo salio mal hable con el administrador'
        });
    }    

};


module.exports = { login };
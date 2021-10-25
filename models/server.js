const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');
const port = process.env.PORT;


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar db
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();

    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            
            console.log('servidor corriendo en el puerto: ', this.port);
        });
    }

    middlewares(){
        //PUBLICO
        this.app.use( express.static(path.join(__dirname, '../public')) );

        //CORS
        this.app.use(cors());
        
        //LECTURA Y PARSEO
        this.app.use(express.json());
    }

    async conectarDB(){
        await dbConnection();
    }
}

module.exports = Server;
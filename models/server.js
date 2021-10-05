const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            //console.log(`Example app listening at http://localhost:${port}`);
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
}

module.exports = Server;
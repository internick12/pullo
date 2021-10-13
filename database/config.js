const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CON);

        console.log('Base de datos online');
        
    } catch (error) {
        throw new Error('Error al conectar la base de datos');
    }

}

module.exports = { dbConnection };
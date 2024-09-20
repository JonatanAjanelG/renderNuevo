module.exports = (sequelize,Sequelize) => {

    const Canciones = sequelize.define('cancion', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreCancion:{
            type: Sequelize.STRING
        },
        descripcion:{
            type: Sequelize.STRING
        },
        artista:{
            type: Sequelize.STRING
        },
        duracion:{
            type: Sequelize.STRING
        },
        extensionCancion:{
            type: Sequelize.STRING
        },
        albun:{
            type: Sequelize.STRING
        },
        anio:{
            type: Sequelize.INTEGER
        }
        
    });
    
    return Canciones;
}
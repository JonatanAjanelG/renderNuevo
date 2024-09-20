const db = require('../config/db.config.js');
const Canciones = db.Canciones;


exports.create = (req, res) => {
    let cancion = {};
    try {

        cancion.nombreCancion = req.body.nombreCancion;
        cancion.descripcion = req.body.descripcion;
        cancion.artista = req.body.artista;
        cancion.duracion = req.body.duracion;
        cancion.extensionCancion = req.body.extensionCancion;
        cancion.albun = req.body.albun;
        cancion.anio = req.body.anio;

        //Creamos el nuevo registro en la bd
        Canciones.create(cancion).then(result => {

            res.status(200).json({
                message: "Cancion Guardada con exito" + result.id,
                cancion: result,
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo crear esta cancion en la BD",
            error: error.message,
        });
    };

}

exports.retrieveAllCanciones = (req, res) => {

    Canciones.findAll().then(cancionesInfos => {

        res.status(200).json({
            message: "Listado de Canciones:",
            canciones: cancionesInfos,
        });
    }).catch(err => {
        res.status(500).json({
            message:
                "Error -> " + err.message,
        });

    });
};

exports.getCancionById = (req, res) => {

    Canciones.findByPk(req.params.id).then(cancionInfo => {

        if (!cancionInfo) {
            return res.status(404).json({
                message: "No se encontro la cancion con el id: " + req.params.id,
            });
        }

        res.status(200).json({
            message: "La cancion con el id: " + req.params.id + " es:",
            cancion: cancionInfo,
        });
    }).catch(err => {
        res.status(500).json({
            message:
                "Error -> " + err.message,
        });
    });
};


exports.updateCancionById = async (req, res) => {
    try {
        let cancionId = req.params.id;
        let cancion = await Canciones.findByPk(cancionId);

        if (!cancion) {
            // return a response to client
            res.status(404).json({
                message: "No se encontro ningun cancion con este iD= " + cancionId,
                cancionId: "",
                error: "404"
            });
        } else {
            // 
            let updatedObject = {
                nombreCancion: req.body.nombreCancion,
                descripcion: req.body.descripcion,
                artista: req.body.artista,
                duracion: req.body.duracion,
                extensionCancion: req.body.extensionCancion,
                albun: req.body.albun,
            }
            let result = await Canciones.update(updatedObject, { returning: true, where: { id: cancionId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar los datos de la Cancion con el ID = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cancion Actualizado correctamente con el ID = " + cancionId,
                cancion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Error de Cancion con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteCancionById = (req, res) => {

    Canciones.destroy({
        where: {
            id: req.params.id,
        },
    }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "La cancion con el id: " + req.params.id + " ha sido eliminado correctamente",
            });
        } else {
            res.status(404).json({
                message: "No se encontro la cancion con el id: " + req.params.id,
            });
        }
    }).catch(err => {
        res.status(500).json({
            message:
                "Error -> " + err.message,
        });
    });
};
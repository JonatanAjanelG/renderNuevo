let express = require('express');
let router = express.Router();

const Canciones = require('../controllers/canciones.controller.js');

router.post('/api/cancionnueva', Canciones.create);
router.get('/api/canciones', Canciones.retrieveAllCanciones);
router.get('/api/cancion/:id', Canciones.getCancionById);
router.delete('/api/cancion/:id', Canciones.deleteCancionById);
router.put('/api/cancion/:id', Canciones.updateCancionById);

module.exports = router;
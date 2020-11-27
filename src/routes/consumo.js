const express = require('express');
const app = express();

const {createConsumo, getConsumos, getConsumoByDevice, message} = require('../controllers/consumo.controller');

// /api/codigo/[verbo]
app.post('/create',  createConsumo);
app.get('/list', getConsumos);
app.get('/list/:device', getConsumoByDevice);
//app.get('/list/user/:usuarios_id', getCodigoByIdUser);
app.get('/verMessage', message);

module.exports = app;
//export default router;
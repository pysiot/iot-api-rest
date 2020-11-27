const express = require('express');
const app = express();

const {createDispositivo, getDispositivos, getDispositivoByDevice} = require('../controllers/dispositivo.controller');

// /api/codigo/[verbo]
app.post('/create',  createDispositivo);
app.get('/list', getDispositivos);
app.get('/list/:device', getDispositivoByDevice);
//app.get('/list/user/:usuarios_id', getCodigoByIdUser);

module.exports = app;
//export default router;
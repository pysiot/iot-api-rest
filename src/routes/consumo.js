const express = require('express');
const app = express();

const {createConsumo, getConsumos, getConsumoByDevice, getConsumoAnual, getConsumoMensualPorAnio, resetAllDataDevice, getConsumoDelDia, message} = require('../controllers/consumo.controller');

// /api/codigo/[verbo]
app.post('/create',  createConsumo);
app.get('/list', getConsumos);
app.get('/list/:device', getConsumoByDevice);
app.get('/listConsumoAnual', getConsumoAnual);
app.get('/listConsumoMensualPorAnio/:anio_calc', getConsumoMensualPorAnio);
app.get('/resetearData/:device', resetAllDataDevice);
app.get('/dia', getConsumoDelDia);
app.get('/verMessage', message);

module.exports = app;

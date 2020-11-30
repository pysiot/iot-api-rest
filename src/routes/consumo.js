const express = require('express');
const app = express();

const {createConsumo, 
    getConsumos, 
    getConsumoByDevice, 
    getConsumoAnual, 
    getConsumoMensualPorAnio, 
    resetAllDataDevice, 
    getConsumoDelDia, 
    getBuscarSiDeviceConsume, 
    getConsumoMensualPorAnio_Device, 
    getConsumoAnual_Device, 
    message} = require('../controllers/consumo.controller');

// /api/codigo/[verbo]
app.post('/create',  createConsumo);
app.get('/list', getConsumos);
app.get('/list/:device', getConsumoByDevice);
app.get('/listConsumoAnual', getConsumoAnual);
app.get('/listConsumoMensualPorAnio/:anio_calc', getConsumoMensualPorAnio);
app.get('/resetearData/:device', resetAllDataDevice);
app.get('/dia', getConsumoDelDia);
app.get('/existeConsumoDeDispositivoCreado/:device', getBuscarSiDeviceConsume);
app.post('/listConsumoMensualPorAnio_Device', getConsumoMensualPorAnio_Device);
app.get('/listConsumoAnual_Device/:device', getConsumoAnual_Device);

app.get('/verMessage', message);

module.exports = app;

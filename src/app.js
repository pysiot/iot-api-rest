const express = require('express');
const { json } = require('express');

//Importing routes
const dispositivoRoutes = require('./routes/dispositivo');
const consumoRoutes = require('./routes/consumo');

//Initialization
const app = express();

//middleware
//app.use(morgan('dev'));
app.use(json());

// http://localhost:3002/api/consumo/verMessage

// Usuarios
app.use('/api/device',dispositivoRoutes);
// Cloud
app.use('/api/consumo',consumoRoutes);

module.exports = app;

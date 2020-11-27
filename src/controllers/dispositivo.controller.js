const Dispositivo = require('../models/Dispositivo');

/* -------------------------------------------------------- */
/* -------> GET ------------------------------------------- */
// Lista todos los códigos registrados.
async function getDispositivos(req, res){
    try{
        const listDispositivos = await Dispositivo.findAll();
        res.json({
            data:listDispositivos
        });
    }catch(e){
        res.status(400).json({
            message: 'Error al intentar obtener la lista de dispositivos, '+ e,
            estado: false
        });
    }
}

// Muestra Dispositivo por Device.
async function getDispositivoByDevice(req, res){
    const { device } = req.params;
    try {        
        const project = await Dispositivo.findOne({
            where:{ device }
        });
        res.json(project);        
    } catch (e) {
        res.status(400).json({
            message: 'Error al intentar obtener datos del device '+device +', '+ e,
            estado: false
        });
    }
}

/* --------------------------------------------------------- */
/* -------> POST ------------------------------------------- */
async function createDispositivo(req, res){
    const {device, servicio, locacion, fec_registro} = req.body;
    try {
        let newDispositivo = await Dispositivo.create({
            device,
            servicio,
            locacion,
            fec_registro
        },{
            fields:['device','servicio','locacion','fec_registro']
        });

        if (newDispositivo){
            return res.json({
                message: 'Dispositivo created successfully',
                data: newDispositivo
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar registrar el Dispositivo, '+ error,
            data: {
            }
        });
    }
  //  console.log(req.body);
}

module.exports={
    getDispositivos:getDispositivos,
    getDispositivoByDevice:getDispositivoByDevice,
    createDispositivo:createDispositivo
    }
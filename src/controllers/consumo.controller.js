const Consumo = require('../models/Consumo');

/* -------------------------------------------------------- */
/* -------> GET ------------------------------------------- */
// Lista todos los códigos registrados.
async function getConsumos(req, res){
    try{
        const listConsumos = await Consumo.findAll();
        res.json({
            data:listConsumos
        });
    }catch(e){
        res.status(400).json({
            message: 'Error al intentar obtener el consumo de los sensores, '+ e,
            estado: false
        });
    }
}

// Muestra Dispositivo por Device.
async function getConsumoByDevice(req, res){
    const { device } = req.params;
    try {        
        const project = await Consumo.findOne({
            where:{ device }
        });
        res.json(project);        
    } catch (e) {
        res.status(400).json({
            message: 'Error al intentar obtener consumo del device '+device +', '+ e,
            estado: false
        });
    }
}

/* --------------------------------------------------------- */
/* -------> POST ------------------------------------------- */
async function createConsumo(req, res){
    const {device, datos, pulsos, bateria, debug, tiempo} = req.body;
    try {
        let newDispositivo = await Consumo.create({
            device,
            datos,
            pulsos,
            bateria,
            debug,
            tiempo
        },{
            fields:['device', 'datos', 'pulsos', 'bateria','debug','tiempo']
        });

        if (newConsumo){
            return res.json({
                message: 'Consumo created successfully',
                data: newConsumo
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error al intentar registrar el consumo, '+ error,
            data: {
            }
        });
    }
  //  console.log(req.body);
}

async function message(req, res){
    try {
        return res.json({
            message: 'Welcome Miincode',
            data: "La data del modelo Usuario esta actualizada"
        });       
    } catch (e) {
        res.status(400).json({
            message:'Error al intentar mostrar el mensaje. '+ error,
            estado: false
        });                    
    }
}
module.exports = {
    getConsumos: getConsumos,
    getConsumoByDevice: getConsumoByDevice,
    createConsumo: createConsumo,
    message: message
}
    
const { sequelize } = require('../db/connect.mysql');
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
        //res.json(project);
    }catch(e){
        res.status(400).json({
            message: 'Error al intentar obtener el consumo de los sensores, '+ e,
            estado: false
        });
    }
}

async function getConsumoMensualPorAnio(req, res){
  const { anio_calc } = req.params;
  try {
    const project = await Consumo.findAll({
      where:{anio_calc: anio_calc},
      attributes:['mes_calc', [sequelize.fn('sum', sequelize.col('kwh_calc')), 'total']],      
      group: ['mes_calc'],
      raw: true,
      order:[['id', 'ASC']]
    });
    console.log('++++++++++++ MENSUAL +++++++++++++');
    console.log(project);
    console.log('------------- MENSUAL -----------')
      res.json(project);
  } catch (e) {
      res.status(400).json({
          message: 'Error trying to get month consumption. '+ e,
          estado: false
      });
  }
}

async function resetAllDataDevice(req, res){
  const { device } = req.params;
  try {
    const project = await Consumo.destroy({
      where:{device: device}
    });
    console.log('++++++++++++ MENSUAL +++++++++++++');
    console.log(project);
    console.log('------------- MENSUAL -----------')
      res.json(project);
  } catch (e) {
      res.status(400).json({
          message: 'Error trying to reset consumption. '+ e,
          estado: false
      });
  }
}

async function getConsumoAnual(req, res){
  
  try {
    const project = await Consumo.findAll({
      attributes:['anio_calc', [sequelize.fn('sum', sequelize.col('kwh_calc')), 'total']],      
      group: ['anio_calc'],
      raw: true,
      order:[['id', 'ASC']]
    });
    console.log('+++++++++++++++++++++++++');
    console.log(project);
    console.log('------------------------')
      res.json(project);
  } catch (e) {
      res.status(400).json({
          message: 'Error trying to get annual consumption. '+ e,
          estado: false
      });
  }
}

async function getConsumoDelDia(req, res){

  let ts = Date.now();
  let date_ob = new Date(ts);
  let day = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  var name_month = nombreMes(month);

  console.log(year + '-' + month + '-'+day);

  try {
    const project = await Consumo.findAll({
      where:{anio_calc: year, mes_calc: name_month, dia_calc: day},
      attributes:['dia_calc', [sequelize.fn('sum', sequelize.col('kwh_calc')), 'total']],      
      group: ['dia_calc'],
      raw: true,
      order:[['id', 'ASC']]
    });
    console.log('+++++++++++++++++++++++++');
    console.log(project);
    console.log('------------------------')
      res.json(project);
  } catch (e) {
      res.status(400).json({
          message: 'Error trying to get annual consumption. '+ e,
          estado: false
      });
  }
}

async function getConsumoByDevice(req, res){
    const { device } = req.params;
    try {
        const project = await Consumo.findAll({
            where:{device: device},
            order:[['id', 'DESC']],
        });
        res.json(project);
    } catch (e) {
        res.status(400).json({
            message: 'Error trying to get consumption of device '+device +', '+ e,
            estado: false
        });
    }
}

function nombreMes(nro_mes){
  var nombreMes = ''; 
  if(nro_mes == 01){ return nombreMes = "ENERO";}
  if(nro_mes == 02){ return nombreMes = "FEBRERO";}
  if(nro_mes == 03){ return nombreMes = "MARZO";}
  if(nro_mes == 04){ return nombreMes = "ABRIL";}
  if(nro_mes == 05){ return nombreMes = "MAYO";}
  if(nro_mes == 06){ return nombreMes = "JUNIO";}
  if(nro_mes == 07){ return nombreMes = "JULIO";}
  if(nro_mes == 08){ return nombreMes = "AGOSTO";}
  if(nro_mes == 09){ return nombreMes = "SETIEMBRE";}
  if(nro_mes == 10){ return nombreMes = "OCTUBRE";}
  if(nro_mes == 11){ return nombreMes = "NOVIEMBRE";}
  if(nro_mes == 12){ return nombreMes = "DICIEMBRE";}

}

/* --------------------------------------------------------- */
/* -------> POST ------------------------------------------- */
async function createConsumo(req, res){

  var consumo_calc    = 0;
  var kwh_calc        = 0.0;
  var fecha_calc      = '';
  var contador_pulsos = 0;
  var mes_calc       = '';

  const {device, datos, pulsos, bateria, debug, tiempo} = req.body;

  // Calculo de fecha hor de registro
  var fecha_calc = new Date(tiempo * 1000).toISOString().slice(0, 19).replace('T', ' ');
  anio_calc = fecha_calc.substring(0, 4);
  mes_calc = nombreMes(fecha_calc.substring(5, 7));
  dia_calc = parseInt(fecha_calc.substring(8, 10));

  try {

    // Sacando la cantidad de  pulsos anterior al registro
    let devConsumo = await Consumo.findAll({
      where:{device: device},
      order:[['id', 'DESC']],
      limit: 1
    }).then(result=>{
        console.log(result);
        if (result[0]){
          contador_pulsos = result[0].dataValues.pulsos;
          return result[0].dataValues;
        }

      });

    console.log('++++++++++++++ Pulsos del dispositivo almacenados anterior al presennte registrado ++++++++');
    console.log(contador_pulsos);
    console.log('++++++++++++++ Pulsos del dispositivo almacenados anterior al presennte registrado ++++++++');
       //formatDateTime(tiempo);
    if(devConsumo){
      if(pulsos => contador_pulsos){
        consumo_calc = pulsos - contador_pulsos;
      }else{
        consumo_calc = pulsos;
      }
    }else{
      consumo_calc = pulsos;
    }
 
    //Calculo los KW.H de los pulsos consumidos
    kwh_calc = consumo_calc / 1600;
    let newConsumo = await Consumo.create({
        device,
        datos,
        pulsos,
        bateria,
        debug,
        tiempo,
        consumo_calc,
        kwh_calc,
        fecha_calc,
        anio_calc,
        mes_calc,
        dia_calc,
      },{
          fields:['device', 'datos', 'pulsos', 'bateria','debug','tiempo', 'consumo_calc', 'kwh_calc', 'fecha_calc', 'anio_calc', 'mes_calc', 'dia_calc' ]
      });

      if (newConsumo){
          return res.json({
              message: 'Consumption created successfully',
              data: newConsumo
          });
      }
  } catch (error) {
      res.status(400).json({
          message: 'Error trying to register consumption., '+ error,
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
    getConsumoAnual: getConsumoAnual,
    getConsumoMensualPorAnio: getConsumoMensualPorAnio,
    resetAllDataDevice: resetAllDataDevice,
    getConsumoDelDia:getConsumoDelDia,
    message: message
}

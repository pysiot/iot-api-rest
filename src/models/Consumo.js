var db = require('../db/connect.mysql'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
/*
CREATE TABLEIF NOT EXISTS consumos (
	id serial PRIMARY KEY,
	device varchar(20) not NULL,
	datos varchar(50) default 'S/D',
	pulsos int default 0,
	bateria int default 0,
	debug varchar(10) default '1',
	tiempo timestamp NOT NULL
)
*/
const Consumo = sequelize.define('consumos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device: {
        type: Sequelize.TEXT
    },
    datos: {
        type: Sequelize.TEXT
    },
    pulsos: {
        type: Sequelize.INTEGER
    },
    bateria: {
        type: Sequelize.INTEGER
    },
    debug: {
        type: Sequelize.TEXT
    },
    tiempo: {
        type: Sequelize.INTEGER
    },
    consumo_calc: {
        type: Sequelize.INTEGER
    },
    kwh_calc: {
        type: Sequelize.DOUBLE
    },
    fecha_calc: {
        type: Sequelize.TEXT
    },
    anio_calc: {
        type: Sequelize.TEXT
    },
    mes_calc: {
        type: Sequelize.TEXT
    },
    dia_calc: {
        type: Sequelize.INTEGER
    }

}, {
    schema: '', timestamps: false
    }
);
module.exports = Consumo;

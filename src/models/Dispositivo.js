var db = require('../db/connect.mysql'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
/*
CREATE TABLE IF NOT EXISTS dispositivos (
	id serial PRIMARY KEY,
	device varchar(20) not NULL,
	servicio varchar(20) not NULL,
	locacion varchar(50) not null,
	fec_registro timestamp NOT NULL
)
*/
const Dispositivo = sequelize.define('dispositivos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device: {
        type: Sequelize.TEXT
    },
    servicio: {
        type: Sequelize.TEXT
    },
    locacion: {
        type: Sequelize.TEXT
    },
    fec_registro: {
        type: Sequelize.TEXT
    }

}, {
    schema: '', timestamps: false
    }
);
module.exports = Dispositivo;
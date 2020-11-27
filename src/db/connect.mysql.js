const Sequelize = require ('sequelize');

const sequelize = new Sequelize(
    'sensorRDS', // DATABASE NAME
    'admin', // USERNAME
    'iot$2020', // PASSWORD
    {
        host:'proyectos-iot.cijcvighakfv.us-east-2.rds.amazonaws.com',
        dialect: 'mysql',
        pool:{
            max:5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging:false
    }
)

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
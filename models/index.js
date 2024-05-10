const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('chiragphp', 'root', '', {
    host: 'localhost',
    logging:false,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db= {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.contact = require("./contact")(sequelize,DataTypes);
db.user = require("./user")(sequelize,DataTypes);


db.sequelize.sync()
module.exports = db;
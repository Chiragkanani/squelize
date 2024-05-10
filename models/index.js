const { Sequelize, DataTypes } = require('sequelize');
try {
    const sequelize = new Sequelize('collage', 'root', 'password', {
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
    db.user = require("./user")(sequelize,DataTypes);
    db.contact = require("./contact")(sequelize,DataTypes);
    
    // db.user.hasMany(db.contact,{foreignKey:"UserId", as:"contactDetails"});
    // db.contact.belongsTo(db.user,{foreignKey:"UserId", as:"UserDetails"});
    db.usercontact = require("./userContact")(sequelize,DataTypes,db.user,db.contact)
    db.user.belongsToMany(db.contact, { through: db.usercontact });
    db.contact.belongsToMany(db.user, { through: db.usercontact });

    db.sequelize.sync({alter:true})
    module.exports = db; 
} catch (error) {
    console.log(error)
}


module.exports = (sequelize, DataTypes) => {
    const education = sequelize.define(
        'Education',
        {
            // Model attributes are defined here
                class_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            grade: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
            passing_year:{
                type:DataTypes.INTEGER
            }
        },
        
    );
    return education
}


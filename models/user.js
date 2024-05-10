
module.exports = (sequelize,DataTypes)=>{
  const User =  sequelize.define(
        'User',
        {
            // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                defaultValue:"Singh"
                // allowNull defaults to true
            },
        },
        {
            // Other model options go here
            // timestamps: false,
            // createdAt:false,
            // updatedAt:"updated_at"
        },
    );
    return User
}



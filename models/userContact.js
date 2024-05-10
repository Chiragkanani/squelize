
module.exports = (sequelize,DataTypes,User,Contact)=>{
  const userContact = sequelize.define(
       'userContact',
       {
        UserId: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'id',
          },
        },
        ContactId: {
          type: DataTypes.INTEGER,
          references: {
            model: Contact,
            key: 'id',
          },
        },
       },
      {
        timestamps:false
      }
   );
   return userContact
}


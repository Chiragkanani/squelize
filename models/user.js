
module.exports = (sequelize,DataTypes)=>{
    try {
        const User =  sequelize.define(
            'User',
            {
                // Model attributes are defined here
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    get() {
                        return  "Mr."+ this.getDataValue('firstName').toUpperCase();
                      },
                      validate:{
                        // isNumeric:{msg:"Only Numeric allowed chirag"},
                        // max:10,
                        len:{args:[2,10],msg:"Length between 2 , 10"}
                      }
                },
                lastName: {
                    type: DataTypes.STRING,
                    defaultValue:"Singh",
                    set(value) {
                        this.setDataValue('lastName', value+", Indians");
                      }
                    // allowNull defaults to true
                },
                email:{
                    type:DataTypes.STRING,
                    unique:true,
                    allowNull:false,
                    validate:{
                        isEmail:true
                    }
                },
                fullName: {
                    type: DataTypes.VIRTUAL,
                    get() {
                      return `${this.firstName} ${this.lastName}`;
                    },
                    set(value) {
                      throw new Error('Do not try to set the `fullName` value!');
                    },
                  }
            },
            {
                // Other model options go here
                // timestamps: false,
                // createdAt:false,
                // updatedAt:"updated_at"
            },
        );
        return User
    } catch (error) {
        console.log(error)
    }
  
}



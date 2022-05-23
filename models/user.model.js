const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

exports.findById = (id) => {
   return User.findById(id).then((result) => {
       result = result.toJSON();
       delete result._id;
       delete result.__v;
       return result;
   });
};

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING 
    },
    password: {
        type: DataTypes.STRING 
    },
    image: {
      type: DataTypes.STRING
    },
    permissionLevel: {
        type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    }
}, {
      token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}); 
module.exports = (User, sequelize);
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Token);
  };
  return User;
};
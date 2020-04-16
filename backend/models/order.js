'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    estimatedDeliveryDate: DataTypes.DATE
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
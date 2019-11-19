module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },
    password: { type: DataTypes.STRING, allowNull: false }
  });

  return User;
}
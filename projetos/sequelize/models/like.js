'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      unique: "userImage"
    },
    imageId: {
      type: DataTypes.INTEGER,
      unique: "userImage"
    }
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Like.belongsTo(models.Image, {
      foreignKey: 'imageId',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};

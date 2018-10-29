'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.STRING,
    text: DataTypes.STRING
  }, { });
  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Image.belongsToMany(models.Tag, {
      through: 'ImageTags'
    });
    Image.hasMany(models.Like, {
      foreignKey: 'imageId',
      onDelete: 'CASCADE'
    });
  };
  return Image;
};

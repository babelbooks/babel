/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('bookmetadata', {
    MetaDataId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ISBN: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Author: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Edition: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    MajorForm: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Cover: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    tableName: 'bookmetadata'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('bookmetadata', {
    metaDataId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    edition: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    majorForm: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    tableName: 'bookmetadata'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('book', {
    bookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookMetaDataId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'bookmetadata',
        key: 'metaDataId'
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    available: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'book'
  });
};

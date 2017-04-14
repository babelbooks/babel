/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('book', {
    BookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    BookMetaDataId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'bookmetadata',
        key: 'MetaDataId'
      }
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserId'
      }
    }
  }, {
    tableName: 'book'
  });
};

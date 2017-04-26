/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('book', {
    bookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    isbn: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    origin: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    available: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'Book'
  });
};

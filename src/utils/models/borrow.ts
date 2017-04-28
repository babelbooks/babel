/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('borrow', {
    borrowId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'book',
        key: 'bookId'
      }
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'User',
        key: 'username'
      }
    },
    beginDate: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dateOfReturn: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'Borrow'
  });
};

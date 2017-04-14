/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('borrow', {
    BorrowId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    BookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'book',
        key: 'BookId'
      }
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'UserId'
      }
    },
    EndDate: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'borrow'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('appointment', {
    appointmentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    currentOwnerId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    borrowId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'borrow',
        key: 'borrowId'
      }
    },
    depositLocationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'depositlocation',
        key: 'depositLocationId'
      }
    }
  }, {
    tableName: 'Appointment'
  });
};

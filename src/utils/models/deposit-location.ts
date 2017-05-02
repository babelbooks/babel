/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('depositlocation', {
    depositLocationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    depositLocationType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    depositLocationAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'depositLocation'
  });
};

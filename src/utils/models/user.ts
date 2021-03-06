/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('user', {
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 2
    },
    score: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    signUpDate: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'User'
  });
};

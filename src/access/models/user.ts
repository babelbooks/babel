/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: "BINARY(64)",
      allowNull: false
    },
    signUpDate: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: 'sequelize.literal(\'CURRENT_TIMESTAMP\')'
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    score: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};

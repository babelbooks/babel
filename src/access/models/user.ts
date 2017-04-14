/* jshint indent: 2 */

module.exports = function(sequelize: any, DataTypes: any) {
  return sequelize.define('user', {
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Password: {
      type: "BINARY(64)",
      allowNull: false
    },
    SignUpDate: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: 'sequelize.literal(\'CURRENT_TIMESTAMP\')'
    },
    LastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Score: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};

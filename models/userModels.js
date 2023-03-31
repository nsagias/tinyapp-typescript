// TODO: text es6 vs common js
// export default (sequelize, DataTypes) => {
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    },
    {
      tableName: "user",
      createdAt: "created_at",
      updatedAt: "updated_at"
    },

  );

  // TODO: ShortLinks and Tokens table
	// User.associate = function (models) {
	// 	User.hasMany(models.Tokens, { foreignKey: "user_id" });
	// 	User.hasMany(models.ShortLinks, { foreignKey: "user_id" });
	// };

	return User;
};




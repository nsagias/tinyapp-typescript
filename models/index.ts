import User from "../models/userModels";
import ShortURL from "../models/URLModels";

User.hasMany(ShortURL,{
  foreignKey:'user_id',
  sourceKey:'id'
});

ShortURL.belongsTo(User,{
  foreignKey:'user_id',
  targetKey:'id'
});

User.sync({ alter: true })

export {
  User,
  ShortURL
};
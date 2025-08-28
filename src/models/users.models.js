import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Documento } from "./documento_models.js";
import { Roles } from "./roles_models.js";
import { user_roles  } from "./user_role_models.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    force: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
},
{
  tableName: "users",
  timestamps: false
});


//Relaciones de uno a uno con el documeto 

//Un usuario puede tener un documento 
User.hasOne(Documento, {
  foreignKey: "author_id",
  as: "documento", 
  onDelete: "CASCADE" //Eliminación en cascada, si se borra un User, también se borra su documento relacionado 
});

//Un documento le pertenece a un usuario
Documento.belongsTo(User, {
  foreignKey: "author_id",
  as: "user"
})

//Relacion muchos amuchos con roles 

// Un user puede tener varios roles
User.belongsToMany(Roles, {
  through: user_roles, //esto crea ua tabla intermesia para relacionar roles con users 
  foreignKey: "user_id",  
  otherKey: "role_id",   
  timestamps: false
});

// Un rol puede pertenecer a varios users

Roles.belongsToMany(User, {
  through: user_roles,
  foreignKey: "role_id",   
  otherKey: "user_id"      
});

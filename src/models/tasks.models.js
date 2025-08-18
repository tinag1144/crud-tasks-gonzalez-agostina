import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./users.models.js";

export const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

//RELACIONES

//Un usuario puede tener muchas tareas
User.hasMany(Task,{
  foreignKey: "author_id", 
  as: "tasks" 
});

//Una tarea le pertenece a un único usuario
Task.belongsTo(User,{
  foreignKey: "users_id", 
  as: "author"
});

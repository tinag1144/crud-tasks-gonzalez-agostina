import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Documento = sequelize.define("Documento", {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    document_number: {
        type: DataTypes.STRING(100),                 
        allowNull: false, 
        unique: true 
      },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    
},{
    tableName: "documents",
    timestamps: false

});
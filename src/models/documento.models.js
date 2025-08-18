import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Documento = sequelize.define("Documento", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    tableName: "Document",
    timestamps: false

});
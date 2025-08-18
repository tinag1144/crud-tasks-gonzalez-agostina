import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Roles = sequelize.define("Roles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: "roles",
    timestamps: false    
});
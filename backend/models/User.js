const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define("User",{email:DataTypes.STRING,password:DataTypes.STRING,role:DataTypes.STRING,base:DataTypes.STRING});
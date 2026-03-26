const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define("Log",{action:DataTypes.STRING,details:DataTypes.TEXT});
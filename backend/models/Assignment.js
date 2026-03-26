const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define("Assignment",{assetType:DataTypes.STRING,quantity:DataTypes.INTEGER,base:DataTypes.STRING,date:DataTypes.DATE});
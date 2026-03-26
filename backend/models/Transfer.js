const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define("Transfer",{assetType:DataTypes.STRING,quantity:DataTypes.INTEGER,fromBase:DataTypes.STRING,toBase:DataTypes.STRING,date:DataTypes.DATE});
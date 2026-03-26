const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define("Purchase",{assetType:DataTypes.STRING,quantity:DataTypes.INTEGER,base:DataTypes.STRING,date:DataTypes.DATE});
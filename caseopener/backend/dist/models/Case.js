"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databse_1 = __importDefault(require("../databse"));
class Case extends sequelize_1.Model {
}
Case.init({
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    skins: { type: sequelize_1.DataTypes.JSON, allowNull: false }, // array of skin IDs
}, {
    sequelize: databse_1.default,
    modelName: 'Case',
});
exports.default = Case;

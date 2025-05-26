"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databse_1 = __importDefault(require("../databse"));
class User extends sequelize_1.Model {
}
User.init({
    username: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    balance: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
}, {
    sequelize: databse_1.default,
    modelName: 'User',
});
exports.default = User;

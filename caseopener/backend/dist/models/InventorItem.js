"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databse_1 = __importDefault(require("../databse"));
const User_1 = __importDefault(require("./User"));
const Skin_1 = __importDefault(require("./Skin"));
class InventoryItem extends sequelize_1.Model {
}
InventoryItem.init({
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    skinId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: databse_1.default,
    modelName: 'InventoryItem',
});
InventoryItem.belongsTo(User_1.default, { foreignKey: 'userId' });
InventoryItem.belongsTo(Skin_1.default, { foreignKey: 'skinId' });
exports.default = InventoryItem;

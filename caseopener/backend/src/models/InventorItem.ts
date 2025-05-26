import { DataTypes, Model } from 'sequelize';
import sequelize from '../databse';
import User from './User';
import Skin from './Skin';

class InventoryItem extends Model {}

InventoryItem.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    skinId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    sequelize,
    modelName: 'InventoryItem',
});

InventoryItem.belongsTo(User, { foreignKey: 'userId' });
InventoryItem.belongsTo(Skin, { foreignKey: 'skinId' });

export default InventoryItem;

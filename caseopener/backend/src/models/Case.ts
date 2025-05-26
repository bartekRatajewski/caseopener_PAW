import { DataTypes, Model } from 'sequelize';
import sequelize from '../databse';

class Case extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public skins!: number[];
}

Case.init({
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    skins: { type: DataTypes.JSON, allowNull: false }, // array of skin IDs
}, {
    sequelize,
    modelName: 'Case',
});

export default Case;

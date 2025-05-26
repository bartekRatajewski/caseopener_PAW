import { DataTypes, Model } from 'sequelize';
import sequelize from '../databse';

class Skin extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public image!: string;
}

Skin.init({
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
}, {
    sequelize,
    modelName: 'Skin',
});

export default Skin;

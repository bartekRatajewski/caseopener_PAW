import { DataTypes, Model } from 'sequelize';
import sequelize from '../databse';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public balance!: number;
}

User.init({
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.FLOAT, defaultValue: 0 },
}, {
    sequelize,
    modelName: 'User',
});

export default User;

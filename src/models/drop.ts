import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';

export class Drop extends Model {
    public id: string;
    public pub_key: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Drop.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    pubkey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'drops',
});

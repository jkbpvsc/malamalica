import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';

export class Drop extends Model {
    public id: number;
    public public_key: string;
    public encrypted_data: string | null;
    public nonce: string;

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
    encrypted_data: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nonce: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'drops',
});

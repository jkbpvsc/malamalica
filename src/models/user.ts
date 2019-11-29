import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';

export class User extends Model {
    public gid_uuid: string;
    public gid_name: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

User.init({
    gid_uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    gid_name: {
        type: DataTypes.STRING
    }
}, { sequelize, tableName: 'users' });

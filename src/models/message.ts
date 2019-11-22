import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';
import { Drop } from "./drop";

export class Message extends Model {
    public id: string;
    public data: string;
    public drop_id: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Message.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drop_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Drop,
                key: 'id'
            }
        }
    },
    { sequelize, tableName: 'messages' }
);
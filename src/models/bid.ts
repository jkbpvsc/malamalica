import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';
import { User } from "./user";
import { Post } from "./post";

export class Bid extends Model {
    public readonly id: string;
    public readonly post_id: string;
    public readonly gid_uuid: string;

    public message: string;
    public value: number;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Bid.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    post_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        }
    },
    gid_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'gid_uuid'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
}, { sequelize, tableName: 'bids' });

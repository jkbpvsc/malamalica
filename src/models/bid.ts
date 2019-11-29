import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';
import {Bid} from "./post";
import {User} from "./user";

export class Bid extends Model {
    public readonly id: string;
    public readonly post_id: string;
    public readonly user_id: string;

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
            model: Bid,
            key: 'id',
        }
    },
    user_id: {
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

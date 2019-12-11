import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';
import {Bid} from "./bid";
import {User} from "./user";

export class BidMessage extends Model {
    public readonly id: string;
    public readonly bid_id: string;
    public readonly gid_uuid: string;

    public message: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

BidMessage.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    bid_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Bid,
            key: 'id'
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
    }

}, { sequelize, tableName: 'bid_messages'});

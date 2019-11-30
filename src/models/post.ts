import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';
import { User } from "./user";

export class Post extends Model {
    public readonly id: string;
    public readonly gid_uuid: string;

    public title: string;
    public description: string;
    public category: string;
    public location: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Post.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    gid_uuid: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'gid_uuid'
        },
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, tableName: 'posts' });

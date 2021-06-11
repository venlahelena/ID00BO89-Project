import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";
import {Comment} from "./comment.model"
export class Blog extends Model {
    public id!: number;
    public user_id!: number;
    public headline!: string;
    public content!: Text;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            references: { model: User, key: "id" },
            allowNull: false,
        },
        headline: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
    },
    {
        tableName: "blogs",
        freezeTableName: true,
        sequelize: database,
    }
);
Blog.sync({ force: false }).then(() => console.log("Blog table created"));

export interface BlogInterface {
    id: number;
    user_id: number;
    headline: string;
    content: Text;
}

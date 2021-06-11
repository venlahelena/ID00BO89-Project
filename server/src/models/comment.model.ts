import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";
import { Blog } from "./blog.model";
export class Comment extends Model {
    public id!: number;
    public user_id!: number;
    public blog_id!: number;
    public content!: Text;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Comment.init(
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
        blog_id: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            references: { model: Blog, key: "id" },
            allowNull: false,
        },
        content: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
    },
    {
        tableName: "comments",
        freezeTableName: true,
        sequelize: database,
    }
);
Comment.sync({ force: false }).then(() => console.log("Comment table created"));

export interface CommentInterface {
    id: Number;
    user_id: Number;
    blog_id: Number;
    content: Text;
}

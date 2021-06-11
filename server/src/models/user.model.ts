import {
    Sequelize,
    Model,
    DataTypes,
    BuildOptions,
    CharDataType,
} from "sequelize";
import { database } from "../config/database";
import {Blog} from "./blog.model"
import {Comment} from "./comment.model"
export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        freezeTableName: true,
        sequelize: database,
    }
);
User.sync({ force: false }).then(() => console.log("Users table created"));

export interface UserInterface {
    username: string;
    password: string;
}

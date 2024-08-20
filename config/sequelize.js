import dotenv from 'dotenv';
import { Sequelize, DataTypes, Op } from 'sequelize';
dotenv.config();


const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
)

export {
    sequelize,
    DataTypes,
    Op
};
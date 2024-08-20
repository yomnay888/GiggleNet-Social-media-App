import { sequelize, DataTypes } from '../../config/sequelize.js';

const Friendship = sequelize.define('friendship', {
    userId1: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userId2: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    initiatorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted'),
        allowNull: false
    }   
})

// friendship associations is defined in user model


export default Friendship;
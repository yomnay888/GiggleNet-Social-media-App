import { sequelize, DataTypes } from '../../config/sequelize.js';

const Session = sequelize.define('session', {
    sessionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiredAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Session.associate = async (models) => {
    const { user, session } = models;
    session.belongsTo(user, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
}


export default Session;
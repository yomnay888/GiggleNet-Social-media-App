import { sequelize, DataTypes } from '../../config/sequelize.js';

const CommentLike = sequelize.define('commentLike', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }   
}, {
    createdAt: true,
    updatedAt: false
})
export default CommentLike;
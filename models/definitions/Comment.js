import { sequelize, DataTypes } from '../../config/sequelize.js';

const Comment = sequelize.define('comment', {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Comment.associate = async (models) => {
    const { user, post, comment, commentLike } = models;
    comment.belongsToMany(user, { through: commentLike, as: 'Likers', foreignKey: 'commentId' });
    comment.belongsTo(post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
}

export default Comment;
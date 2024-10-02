import { sequelize, DataTypes } from '../../config/sequelize.js';
// import PostLike from './PostLike.mjs';

const Post = sequelize.define('post', {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
     // New column to track number of likers
     likersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    mediaFiles: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

Post.associate = async (models) => {
    const { user, comment, post, postLike } = models;
    post.belongsToMany(user, { through: postLike, as: 'Likers', foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    post.belongsTo(user, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    post.hasMany(comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
};

export default Post;
import { sequelize, DataTypes } from '../../config/sequelize.js';

const PostLike = sequelize.define('postLike', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }   
}, {
    createdAt: true,
    updatedAt: false
})
export default PostLike;
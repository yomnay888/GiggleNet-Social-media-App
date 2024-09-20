import { sequelize, DataTypes } from '../../config/sequelize.js';
import CommentLike from './CommentLike.js';
import PostLike from './PostLike.js';
import Friendship from './Friendship.js';
const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
   name: {
        type: DataTypes.STRING,
        allowNull: false
   },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    profilePicture:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'uploads/profile-pictures/default-profile-picture.jpg'
    },
},
    {
        updatedAt: false
    }
);

User.associate = async (models) =>{

    const { post, comment, session, user ,  } = models;
    
    user.hasMany(post, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasMany(comment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasMany(session, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.belongsToMany(post, { through: PostLike, as: 'LikedPosts', foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    user.belongsToMany(comment, { through: CommentLike, as: 'LikedComments', foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    user.belongsToMany(user, { as: 'Friends', through: Friendship, foreignKey: 'userId1', otherKey: 'userId2' });
    user.belongsToMany(user, { as: 'FriendsOf', through: Friendship, foreignKey: 'userId2', otherKey: 'userId1' });

    }
export default User;
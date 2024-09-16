import {useState, useEffect} from 'react';
import './Post.css';


function Post({post}) {
    const user = post.user;
    function timeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - new Date(date)) / 1000);
    
        let interval = Math.floor(seconds / 31536000); // Seconds in a year
        if (interval >= 1) {
            return interval === 1 ? 'a year ago' : `${interval} years ago`;
        }
    
        interval = Math.floor(seconds / 2592000); // Seconds in a month
        if (interval >= 1) {
            return interval === 1 ? 'a month ago' : `${interval} months ago`;
        }
    
        interval = Math.floor(seconds / 86400); // Seconds in a day
        if (interval >= 1) {
            return interval === 1 ? 'a day ago' : `${interval} days ago`;
        }
    
        interval = Math.floor(seconds / 3600); // Seconds in an hour
        if (interval >= 1) {
            return interval === 1 ? 'an hour ago' : `${interval} hours ago`;
        }
    
        interval = Math.floor(seconds / 60); // Seconds in a minute
        if (interval >= 1) {
            return interval === 1 ? 'a minute ago' : `${interval} minutes ago`;
        }
    
        return seconds < 30 ? 'just now' : `${seconds} seconds ago`;
    }

    const timeAgoString = timeAgo(post.createdAt);
    return(
        <div className='post-container'>
            <div className="top-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <div className='text-info'>
                    <h3>{user.name}</h3>
                    <p>{timeAgoString}</p>
                </div>
                <i className="fa-solid fa-ellipsis options-icon"></i>
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
            <div className="stats-section">
                { post.likersCount > 0 && 
                    <div className="likes-stats">
                    <i className="fa-brands fa-gratipay fa-spin fa-spin-reverse"></i>    
                    <p>{post.likersCount}</p>
                    </div>
                }
                {  post.commentsCount > 0 &&
                    <div className="comments-stats">
                        <i className="fa-solid fa-comment"></i>
                        <p>{post.commentsCount}</p>
                    </div>
                }
            </div>
            <hr />
            <div className="bottom-section">
                <div className="likes">
                    <i className="fa-regular fa-heart"></i>
                    <p>Like</p>
                </div>
                <div className="comments">
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                </div>  
            </div>
            <hr />
            <div className="comment-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <input type="text" placeholder="Write a comment..." />
                

            </div>
        </div>
    );

}

export default Post;

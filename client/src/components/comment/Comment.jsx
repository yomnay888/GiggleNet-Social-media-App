import React, { useState, useEffect } from 'react';
import './Comment.css';

function Comment({ comment, isLiking , toggleCommentLike }) {
    // const [isLiked, setIsLiked] = useState(false);
    const [timeAgoString, setTimeAgoString] = useState('');
    const commentOwner = comment.Author
    console.log('comenttt',comment)
    useEffect(() => {
        setTimeAgoString(calculateTimeAgo(comment.createdAt));
    }, []);

    // function toggleLike() {
    //     setIsLiked(!isLiked);
    // };

    console.log("checking for infinite loop in comment component");

    function calculateTimeAgo(date) {
            const now = new Date();
            const seconds = Math.floor((now - new Date(date)) / 1000);
        
            let interval = Math.floor(seconds / 31536000); // Seconds in a year
            if (interval >= 1) {
                return interval === 1 ? '1y' : `${interval}y`;
            }
            
            interval = Math.floor(seconds / 604800); // Seconds in a week
            if (interval >= 1) {
                return interval === 1 ? '1w' : `${interval}w`;
            }
        
            interval = Math.floor(seconds / 86400); // Seconds in a day
            if (interval >= 1) {
                return interval === 1 ? '1d' : `${interval}d`;
            }
        
            interval = Math.floor(seconds / 3600); // Seconds in an hour
            if (interval >= 1) {
                return interval === 1 ? '1h' : `${interval}h`;
            }
        
            interval = Math.floor(seconds / 60); // Seconds in a minute
            if (interval >= 1) {
                return interval === 1 ? '1m' : `${interval}m`;
            }
        
            return seconds < 30 ? 'just now' : `${seconds}s`;
    }

    return (
        <div className="comment-container">
            {/* <img
                src={`${import.meta.env.VITE_BACKEND_BASE_URL}${commentOwner.profilePicture}`}
                alt="Profile"
                className="comment-profile-pic"
            /> */}
            <div className="comment-text">
                <div className="comment-info">
                    <p className='comment-owner'>{commentOwner.name}</p>
                    <p className='comment-content'>{comment.content}</p>
                </div>
                <div className="comment-actions">
                    <span className="time-ago">{timeAgoString}</span>
                    <span 
                        className={`love-button ${comment.isLiked ? 'loved' : 'not-loved'}`} 
                        onClick={ () => !isLiking && toggleCommentLike(comment.commentId, comment.isLiked) }
                    >
                        Love
                    </span>
                    {comment.likersCount > 0 && (
                        <div className="like-stats">
                            <p>{comment.likersCount}</p>
                            <img src="./heart-image.svg" alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Comment);
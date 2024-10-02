import { useState, useEffect, useRef } from 'react';
import './Post.css';
import ".././composePost/ComposePost.css";
import PostOptions from '../postOptions/PostOptions';
import EditPost from '../editPost/EditPost';
import Comment from '../comment/Comment';
import { getPostCommentsByPagination, addComment, likeComment, unlikeComment } from '../../services/commentRequests';

const limit = 5;

function Post({ post, togglePostLike, isLiking, deletePost, postFocusShowComments, handleShowComments, handleHideComments }) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [timeAgoString, setTimeAgoString] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);
    const [hasMoreComments, setHasMoreComments] = useState(true);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [isLikingComment, setIsLikingComment] = useState(false);
    // const [commentsPage, setCommentsPage] = useState(1);
    console.log("checking for infinite loop in post component");


    const currentUser = JSON.parse(localStorage.getItem('user'));
    const user = post.user;
    const mediaFiles = post.mediaFiles || [];
    // console.log("mediaFiles: ", mediaFiles);
    useEffect(() => {
        setTimeAgoString(calculateTimeAgo(post.createdAt));
        console.log("lllllllllllllllllllllllllllll",comments)
    }, [])

    async function fetchComments() {
        if (!hasMoreComments) return;

        const commentsData = await getPostCommentsByPagination(post.postId, commentsPage, limit);
        // console.log("commentsData: ", commentsData);
        const { comments, nextPage } = commentsData;
        setComments(prevComments => [...prevComments, ...comments]);

        if (!nextPage) setHasMoreComments(false);
    }

    useEffect(() => {
        fetchComments();
    }, [commentsPage])
    

    function calculateTimeAgo(date) {
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
    
        interval = Math.floor(seconds / 604800); // Seconds in a week
        if (interval >= 1) {
            return interval === 1 ? 'a week ago' : `${interval} weeks ago`;
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
    

    // Show the previous image
    function handleShowPrevImage() {
        let newIndex = currentMediaIndex - 1;
        if (newIndex < 0) newIndex = mediaFiles.length - 1;

        setCurrentMediaIndex(newIndex);
    }

    // Show the next image
    function handleShowNextImage() {
        let newIndex = (currentMediaIndex + 1) % mediaFiles.length;
        setCurrentMediaIndex(newIndex);
    }

    function toggleShowEdit() {
        setShowEdit(prevState => !prevState);
    }

    
    async function handleAddComment(commentContent) {
        const newComment = await addComment(post.postId, commentContent);
        console.log("newCommentData", newComment); 
        // const newComment = newCommentData.comment;

        setComments(prevComments => [newComment, ...prevComments]);        
        setNewCommentContent("");
    }


    function renderMediaFiles() {

        const currentFile = mediaFiles[currentMediaIndex];
        const fileURL = `${import.meta.env.VITE_BACKEND_BASE_URL}${currentFile.path}`;
        return (
            <>
                <div
                    className="media-content"
                >
                    {
                        currentFile.mediaType.startsWith("image") ?
                            <img src={fileURL} alt="Selected media" /> :
                            <video src={fileURL} controls />
                    }
                </div>

                {mediaFiles.length > 1 &&
                    <div className="media-control">
                        <i
                            className="fa-solid fa-angle-left left-arrow"
                            onClick={handleShowPrevImage}
                        ></i>
                        <p>{`${currentMediaIndex + 1}/${mediaFiles.length}`}</p>
                        <i
                            className="fa-solid fa-angle-right right-arrow"
                            onClick={handleShowNextImage}
                        ></i>

                    </div>
                }
            </>
        )
    };


    function handleNewCommentContentChange(e) {
        setNewCommentContent(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scrollHeight
    }


    async function toggleCommentLike(commentId, isCommentLiked) {
        if (isLiking) return;
        setIsLikingComment(true);

        try {
            let newLikersCount;
            if (isCommentLiked)
                newLikersCount = await unlikeComment(commentId);
            else
                newLikersCount = await likeComment(commentId);

            console.log("newLikersCount: ", newLikersCount);

            setComments(prevComments => prevComments.map(comment => {
                return comment.commentId === commentId ? 
                    { ...comment, isLiked: !isCommentLiked, likersCount: newLikersCount } : comment;
            }))
        } catch (error) {
            console.log("error from togglePostLike: ", error);
        } finally {
            setIsLikingComment(false);
        }
    }





    return (
        <div 
            className='post-container'
            // some styles are changes when the comments are shown
            style={{ 
                marginBottom: postFocusShowComments ? '0' : '20px',
                height: postFocusShowComments ? '100%' : '',
                boxShadow: postFocusShowComments ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.15)' ,
                paddingBottom: postFocusShowComments ? '0' : '12px'

            }}
        >
            <div className="top-section">
            <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}${post.user.profilePicture}`} alt="" />
                <div className='text-info'>
                    <h3>{user.name}</h3>
                    <p>{timeAgoString}</p>
                </div>

                {
                    currentUser.userId === post.userId &&
                    <PostOptions
                        deletePost={() => deletePost(post.postId)}
                        toggleShowEdit={toggleShowEdit}
                    />
                }
                {
                    showEdit &&
                    <EditPost
                        postMedia={mediaFiles}
                        postContent={post.content}
                        postId={post.postId}
                        toggleShowEdit={toggleShowEdit}
                    />
                }
            </div>
            {
                post.content &&
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
            }

            {
                mediaFiles.length > 0 &&
                <div className="media-container">
                    {renderMediaFiles()}
                </div>

            }


            <div className="stats-section">
                {post.likersCount > 0 &&
                    <div className="likes-stats">
                        <img src="./heart-image.svg" alt="" />
                        <p>{post.likersCount}</p>
                    </div>
                }
                {post.commentsCount > 0 &&
                    <div className="comments-stats">
                        <i className="fa-solid fa-comment"></i>
                        <p>{post.commentsCount}</p>
                    </div>
                }
            </div>

            <div 
                className="bottom-section"
                style={{ 
                    borderBottom: postFocusShowComments ? '1px solid #d6d6d6' : 'none'
                }}
            >
                <div
                    className={`${post.isLiked ? 'liked' : ''}`}
                    onClick={() => !isLiking && togglePostLike(post.postId, post.isLiked)}

                >
                    {
                        post.isLiked ?
                            <img src="./heart-image.svg" alt="" /> :
                            <i className={`fa-regular fa-heart`}></i>
                    }
                    <p>Love</p>
                </div>
                <div 
                    className="comments"
                    onClick={() => handleShowComments(post)}
                >
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                </div>
            </div>
            {
                postFocusShowComments &&
                <>
                    <div className='comments-display'>
                        {
                            hasMoreComments &&
                            <h5 
                                className='more-comments'
                                onClick={() => setCommentsPage(prevPage => prevPage + 1)}
                            >View more comments</h5>

                        }
                        {
                        
                            comments.slice().reverse().map(comment =>
                                <Comment
                                    key={comment.commentId}
                                    comment={comment}
                                    toggleCommentLike={toggleCommentLike}
                                    isLiking={isLikingComment}
                                />
                            )

                        }
                    </div>
                    <div className="comment-compose-section">
                        <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}uploads/profile-pictures/default-profile-picture.png`} alt="" />
                        <textarea
                            placeholder="Write a comment..."
                            value={newCommentContent}
                            onInput={handleNewCommentContentChange}
                        />
                        <i 
                            className={`fa-solid fa-share share-icon ${newCommentContent === '' ? 'share-disabled' : 'share-enabled'}`}
                            onClick={() => handleAddComment(newCommentContent) }
                        >
                            
                        </i>

                    </div>
                </>
            }
        </div>
    );

}

export default Post;
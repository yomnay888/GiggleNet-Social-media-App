import { useState, useEffect, useRef } from 'react';
import './Feed.css';    
import Post from '../post/Post';
import { getPostsByPagination, likePost, unlikePost, deletePost, updatePost } from '../../services/postRequests';
import ComposePost from '../composePost/ComposePost';
import { PostContext } from '../../contexts/PostContext';
function Feed({ mainRef, isUserFeed }) {
    const [posts, setPosts] = useState([]);
    const [activePost, setActivePost] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLiking, setIsLiking] = useState(false);
    const [postFocusShowComments, setPostFocusShowComments] = useState(false);

    const scrollTimeoutRef = useRef(null);  // To hold the debounce timeout
    console.log("checking for infinite loop in feed component");
    // console.log("Feed rendered");
    useEffect(() => {
        async function fetchPosts() {
            if (!hasMore) return; // Prevent multiple fetches
            const postsData = await getPostsByPagination(page, 5, isUserFeed);
            const { posts, nextPage } = postsData;
            // console.log(posts);
            setPosts(prevPosts => [...prevPosts, ...posts]);

            if (!nextPage) setHasMore(false);

        }
        fetchPosts();

    }, [page, isUserFeed]);

    async function togglePostLike(postId, isLiked) {
        if (isLiking) return;
        setIsLiking(true);

        try {
            let newLikersCount;
            if (isLiked)
                newLikersCount = await unlikePost(postId);
            else
                newLikersCount = await likePost(postId);
            setPosts(prevPosts => prevPosts.map(post => {
                if (activePost && post.postId === activePost.postId) {
                    setActivePost({ ...activePost, likersCount: newLikersCount, isLiked: !isLiked });
                }
                return post.postId === postId ? { ...post, likersCount: newLikersCount, isLiked: !isLiked } : post;
            }));

        } catch (error) {
            console.log("error from togglePostLike: ", error);
        } finally {
            setIsLiking(false);
        }
    }

    // track the current scroll position

    useEffect(() => {
        const scrollTracker = mainRef.current;

        const handleScroll = () => {

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); // Clear previous timeout

            scrollTimeoutRef.current = setTimeout(() => {
                // 7 4                         // 230                                  // 300px           
                if (scrollTracker.scrollTop + scrollTracker.clientHeight >= scrollTracker.scrollHeight - 250 && hasMore)
                    setPage(prevPage => prevPage + 1);
            }, 50); // 50ms debounce delay
        };


        scrollTracker.addEventListener('scroll', handleScroll);

        return () => scrollTracker.removeEventListener('scroll', handleScroll);

    }, [hasMore]);


    async function handleDeletePost(postId) {
        try {
            await deletePost(postId);
            setPosts(prevPosts => {
                if (activePost && activePost.postId === postId) {
                    setPostFocusShowComments(false);
                    setActivePost(null);
                } 
                return prevPosts.filter(post => post.postId !== postId)
            });

        } catch (error) {
            console.log("error from deletePost: ", error);
        }
    }

    function handleAddPost(newPost) {
        console.log("This is the new Post", newPost);

        setPosts(prevPosts => [newPost, ...prevPosts]);
    }

    async function handleUpdatePost(postId, content, mediaFiles) {
        const updatedPost = await updatePost(postId, content, mediaFiles);
        console.log("updatedPost: ", updatedPost);
        setPosts(prevPosts => prevPosts.map(post => {
            if (activePost && post.postId === activePost.postId) {
                setActivePost(updatedPost);
            }
            return post.postId === postId ? updatedPost : post;
        }));

    }

    function handleShowComments(post) {
        if (postFocusShowComments) return;
        setActivePost(post);
        setPostFocusShowComments(true);
    }

    return (
        <PostContext.Provider value={{ handleUpdatePost }}>
            <section className='feed-container'>
                <ComposePost handleAddPost={handleAddPost} />
                {posts.map(post =>
                    <Post
                        key={post.postId}
                        post={post}
                        togglePostLike={togglePostLike}
                        isLiking={isLiking}
                        deletePost={handleDeletePost}
                        postFocusShowComments={false}
                        handleShowComments={handleShowComments}
                        
                    />
                )}
                {!hasMore && <p>No more posts to load.</p>}

            </section>

            { postFocusShowComments && activePost &&
                <div className='post-overlay'>
                    <div className='post-with-comments-container'>
                        <Post
                            key={activePost.postId}
                            post={activePost}
                            togglePostLike={togglePostLike}
                            isLiking={isLiking}
                            deletePost={handleDeletePost}
                            postFocusShowComments={postFocusShowComments}
                            handleShowComments={handleShowComments}
                        
                        />     
                    </div>
                </div>
                
            }


        </PostContext.Provider>
    );

}

export default Feed;
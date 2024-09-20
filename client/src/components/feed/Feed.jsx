import { useState, useEffect } from 'react';
import './Feed.css';
import Post from '../post/Post';
import { getPostsByPagination } from '../../services/postRequests';

function Feed({ mainRef, isUserFeed }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const postsData = await getPostsByPagination(page, 5, isUserFeed);
            console.log('posts dataa',postsData);
            const { posts, nextPage } = postsData;
            setPosts(prevPosts => [...prevPosts, ...posts]);
            if (!nextPage) 
                setHasMore(false);
        }
        fetchPosts();        
    }, [page, isUserFeed]); // Depend on isUserFeed

    // Track the current scroll position
    useEffect(() => {
        const scrollTracker = mainRef.current;
        const handleScroll = () => {
            if (scrollTracker.scrollTop + scrollTracker.clientHeight >= scrollTracker.scrollHeight - 200 && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }; 
        scrollTracker.addEventListener('scroll', handleScroll);
        return () => {
            scrollTracker.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, mainRef]); // Add mainRef as a dependency

    return (
        <section className='feed-container'>
            {posts.map(post => 
                <Post key={post.postId} post={post} />
            )}
            {!hasMore && <p>No more posts to load.</p>}
        </section>
    );
}

export default Feed;

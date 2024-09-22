import './Friends.css';
import { useState, useEffect } from 'react';
import { getFriendsByPagination } from '../../services/friendsRequests';
import { useNavigate } from 'react-router-dom';
const limit=9;
const Friends = ({userId}) => {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        getFriends(currentPage);
    }, [currentPage,userId]);

    const getFriends = async (page) => {
        try {
            const {paginationResults} = await getFriendsByPagination(page, limit,userId);
            setFriends(paginationResults.friends); 
            setTotalPages(paginationResults.totalPages);
            setError(null); 
        } catch (error) {
            setError('Failed to fetch friends. Please try again later.');
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleFriendClick = (userId) => {
        navigate(`/profile/${userId}`);
    }

    return (
        <div>
            <div className="friends-list">
                {friends.map(friend => (
                    <div key={friend.userId} className="friend-card" onClick={()=>handleFriendClick(friend.userId)}>
                        <img 
                            className="friend-pic"
                            src={`${import.meta.env.VITE_BACKEND_BASE_URL}${friend.profilePicture}`} 
                        />
                        <p className='friend-name'>{friend.name}</p>
                    </div>
                ))}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                <button onClick={handleNext} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Friends;

import './Friends.css';
import { useState, useEffect } from 'react';
import { fetchGetFriends } from '../../services/getFriends';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const friendsPerPage = 4;

    // Fetch friends when the component mounts
    useEffect(() => {
        getFriends();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Function to fetch friends
    const getFriends = async () => {
        try {
            const data = await fetchGetFriends();
            setFriends(data.friends); // Assuming data is the array of friends
            setError(null); // Reset error state
        } catch (error) {
            setError('Failed to fetch friends. Please try again later.');
        }
    };

    const handleNext = () => {
        if ((currentPage + 1) * friendsPerPage < friends.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * friendsPerPage;
    const selectedFriends = friends.slice(startIndex, startIndex + friendsPerPage);

    return (
        <div>
            <div className="friends-list">
                {selectedFriends.map(friend => (
                    <div key={friend.userId} className="friend-card">
                        <img  className="friend-pic"
                       src={`${import.meta.env.VITE_BACKEND_BASE_URL}${friend.profilePicture}`}                             className="friend-pic" 
                        />
                        <p className='friend-name'>{friend.name}</p>
                    </div>
                ))}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                <button onClick={handleNext} disabled={(currentPage + 1) * friendsPerPage >= friends.length}>Next</button>
            </div>
        </div>
    );
};

export default Friends;

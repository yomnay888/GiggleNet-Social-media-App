import './Friends.css';
import { useState } from 'react';
const Friends = () => {
    const friendsList = [
        { 
            id: 1,
            name: "John Doe",
            profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        { 
            id: 2,
            name: "Jane Doe",
            profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
            id: 3,
            name: "John Smith",
            profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 4,
            name: "Jane Smith",
            profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 5,
            name: "John Johnson",   
            profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 6,
            name: "Jane Johnson",
            profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        {
            id: 7,
            name: "John Williams",
            profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
        },
    ];
    const [currentPage, setCurrentPage] = useState(0);
    const friendsPerPage = 6;

    const handleNext = () => {
        if ((currentPage + 1) * friendsPerPage < friendsList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * friendsPerPage;
    const selectedFriends = friendsList.slice(startIndex, startIndex + friendsPerPage);

    return (
        <div>
            <div className="friends-list">
                {selectedFriends.map(friend => (
                    <div key={friend.id} className="friend-card">
                        <img src={friend.profilePic} alt={friend.name} className="friend-pic" />
                        <p>{friend.name}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button  onClick={handlePrev} disabled={currentPage === 0}>Previous</button>
                <button  onClick={handleNext} disabled={(currentPage + 1) * friendsPerPage >= friendsList.length}>Next</button>
            </div>
        </div>
    );
};

export default Friends;

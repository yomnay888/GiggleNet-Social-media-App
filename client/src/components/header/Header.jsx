import React, { useState, useEffect } from 'react';
import "./Header.css";
import { fetchSearchResults } from '../../services/searchRequests'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  const profilePicture= `${import.meta.env.VITE_BACKEND_BASE_URL}${user.profilePicture}`;
  // console.log('User:', user);
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    async function fetchResults() {
      try {
        const { results } = await fetchSearchResults(query);
        console.log('Results:', results);
        setResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      }
    }
    fetchResults();
  }, [query]);
  const navigate = useNavigate();
  const handleFocus = () => setIsFocused(true);

  const clearSearch = () => {
    // console.log('clear search');
    // setQuery('');
    // setResults([]);
    // setIsFocused(false);
  };

  const handleProfileClick=(userId)=>{
    navigate(`/profile/${userId}`);
    }

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <header>
      <div className="left-container">
        <img src="./m.jpg" alt="logo" className="logo" />
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <div className="search-box" onBlur={clearSearch}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
          />
          {isFocused && (
            <i
              className="fa-solid fa-angle-left close-search-icon"
              onClick={clearSearch}
            ></i>
          )}
          {(isFocused || results.length > 0) && (
            <div className="results">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <div key={index} className="result-item" onClick={()=> handleProfileClick(result.userId)}>
                    <img className='profile-image' src=
                    {`${import.meta.env.VITE_BACKEND_BASE_URL}${result.profilePicture}`} alt="profile" />
                    <span>{result.name}</span>
                  </div>
                ))
              ) : (
                <div className="no-results">No recent Search</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="right-container">
        <i className="fa-regular fa-bell notification-icon"></i>
        <div className="profile-dropdown">
          <img
            src={profilePicture}
            alt="profile-picture"
            className="profile-picture"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <ul className="dropdown-menu"> 
              <li className='profile' onClick={() =>handleProfileClick(user.userId)} ><img src={profilePicture} alt="profile-picture" className="profile-picture"/> {user.name}</li>
              <li><i className="fa-solid fa-gear"></i> Settings <i className="fa-solid fa-angle-right right-icon"></i></li>
              {/* <i className="fa-solid fa-toggle-on"></i> */} {/*when dark mode is on */}
              <li><i className="fa-solid fa-moon"></i> Dark Mode <i className="fa-solid fa-toggle-off right-icon"></i></li>
              <li><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import "./Header.css";
import { fetchSearchResults } from '../../services/searchService'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  const profilePicture= `${import.meta.env.VITE_BACKEND_BASE_URL}${user.profilePicture}`;
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    async function fetchResults() {
      try {
        const { results } = await fetchSearchResults(query);
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
    console.log('clear search');
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  const handleProfileClick=()=>{
    navigate('/profile');
  }
  return (
    <header>
      <div className="left-container">
        <img src="./logo.png" alt="logo" className="logo" />
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={clearSearch}
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
                  <div key={index} className="result-item">
                    <img className='profile-image' src={result.image} alt="profile" />
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
        <img src={profilePicture} alt="profile-picture" className="profile-picture" onClick={handleProfileClick} />
      </div>
    </header>
  );
}

export default Header;

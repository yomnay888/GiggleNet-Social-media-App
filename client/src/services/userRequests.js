function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
export const getUserById = async (userId) => { 
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();

};
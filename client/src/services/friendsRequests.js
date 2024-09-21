function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
export const getFriendsByPagination= async (page,limit,userId) =>{
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        
        const response = await fetch(`${baseUrl}friendship/${userId}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data =  await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching getting Friends:', error);
        // You might want to handle errors here (e.g., show a notification to the user)
        throw error; // Re-throw the error if needed
    }
}


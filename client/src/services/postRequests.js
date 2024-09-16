
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export const getPostsByPagination = async (page, limit) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const data = await fetch(`${baseUrl}posts?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })
    return await data.json(); 
}
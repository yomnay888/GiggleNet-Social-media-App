import { useTransition } from "react";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const getPostsByPagination = async (page, limit, userId,isUserFeed) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    let url 
    if(isUserFeed){
        url= `${baseUrl}posts?page=${page}&limit=${limit}`;
    }
    else{
         url= `${baseUrl}user-posts/${userId}?page=${page}&limit=${limit}`;
        }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle non-2xx responses
    }

    return await response.json(); 
};

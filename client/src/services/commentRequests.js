
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export async function getPostCommentsByPagination(postId, page, limit) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    console.log('hi from comments');
    const response = await fetch(`${baseUrl}posts/${postId}/comments?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
        },
    });

    const data = await response.json();
    return data;    
}

export async function addComment(postId, content) {
    console.log('hi from add comment',content);
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify({ content }),
    });

    const data = await response.json();
    console.log(data);
    return data;
}




export async function likeComment(commentId) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}comments/${commentId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });

    const data = await response.json();
    return data;
}

export async function unlikeComment(commentId) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}comments/${commentId}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });

    const data = await response.json();
    return data;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export const getPostsByPagination = async (page, limit, isUserFeed) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    let url;
    isUserFeed = false;
    if (isUserFeed) 
        url = `${baseUrl}user-posts?page=${page}&limit=${limit}`;
    else 
        url = `${baseUrl}posts?page=${page}&limit=${limit}`;

    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })
    
    const data = await response.json();
    return data;
}


export const likePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();    
    console.log(data)
    return data;
}

export const unlikePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}posts/${postId}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();    
    return data;
}


export const deletePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    const data = await response.json();    
    return data;
}



export const createPost = async (content, mediaFiles) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const formData = new FormData();
    mediaFiles.forEach(file => {
        formData.append(`mediaFiles`, file); // Add each file to the FormData
    });

    formData.append("content", content);
    

    const response = await fetch(`${baseUrl}posts`, {
        method: 'POST',
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();
    console.log("this is the new post: ", data);
    return data;
}


export const updatePost = async (postId, content, mediaFiles) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const formData = new FormData();
    mediaFiles.forEach(file => {
        if(file.type === "existing")
            formData.append(`existingMediaFiles[]`, JSON.stringify({
                mediaType: file.mediaType,
                path: file.path
            })); 
        else{
            formData.append(`newMediaFiles`, file.file);
        }
    });

    formData.append("content", content);
    

    const response = await fetch(`${baseUrl}posts/${postId}`, {
        method: 'PUT',
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${getCookie('token')}`
        }
    });

    const data = await response.json();
    console.log("this is the updated post: ", data);
    return data;
}
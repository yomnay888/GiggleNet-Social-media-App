import React from 'react';

function UserPosts() {
    const posts = [
        {
            id: 1,
            content: "This is a post",
        },
        {
            id: 2,
            content: "This is another post",    
        },  
    ];

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default UserPosts;

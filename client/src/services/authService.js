
export const login = async (email, password) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password })
    });

    console.log(response.ok);

    if(!response.ok) {
        throw new Error('Invalid email or password');
    }
    
    const data = await response.json();
    console.log(data);
    return data.loginData;

}


export const signup = async (firstName, lastName, email, password) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  username: "username4",firstName, lastName, email, password })
    });

    if(!response.ok) {
        if (response.status === 409)
            throw new Error('email already exists, try logging in');

        throw new Error('Signup failed, Please try again later');
    }

    const data = await response.json();
    // console.log(data);
    return data;
}


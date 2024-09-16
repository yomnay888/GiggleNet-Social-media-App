import React, { useState, useRef } from 'react';
import './LoginForm.css'; // Importing the CSS file
import { login } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        login: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Move useNavigate hook to the top level
    const navigate = useNavigate();

    function handleEmailChange() {
        if (errors.email || errors.login) {
            setErrors({ ...errors, email: '', login: '' });
        }
    }

    function handlePasswordChange() {
        if (errors.password || errors.login) {
            setErrors({ ...errors, password: '', login: '' });
        }
    }

    function isValidGmail(email) {
        const gmailPattern = /^[^\s@]+@gmail\.com$/;
        return gmailPattern.test(email);
    }

    function validateFormData() {
        let valid = true;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const newErrors = {
            email: '',
            password: '',
        };

        if (!email) {
            newErrors.email = 'Email is required!';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required!';
            valid = false;
        }

        if (email && !isValidGmail(email)) {
            newErrors.email = 'Please enter a valid Gmail address!';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    function toggleShowPassword() {
        setShowPassword(prevShowPassword => !prevShowPassword);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (validateFormData()) {
            try {
                setIsLoading(true);
                const loginData = await login(emailRef.current.value, passwordRef.current.value);
                console.log(loginData);
                localStorage.setItem('user', JSON.stringify(loginData.user));
                document.cookie = `token=${loginData.token}; path=/; secure; samesite=strict;`;

                // Use navigate to redirect after login
                navigate('/home');
            } catch (error) {
                console.log("This is the catch block:" + error.message);
                setErrors({ ...errors, login: 'Invalid email or password' });
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        }
    }

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        className={errors.email ? 'error-input' : ''}
                        ref={emailRef}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}

                <div className="form-group ">
                    <label htmlFor="password">Password</label>
                    <div className={`password-input`}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={errors.password ? 'error-input' : ''}
                            ref={passwordRef}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                        />
                        <i 
                            className={`password-icon fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                            onClick={toggleShowPassword}
                        >
                        </i>
                    </div>
                </div>

                {errors.password && <p className="error-message">{errors.password}</p>}
                {errors.login && <p className="error-message login-error">{errors.login}</p>}

                <button className="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <hr />

                <p className='signup-text'>Don't have an account? <Link className='link' to={'/signup'}>SignUp</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;

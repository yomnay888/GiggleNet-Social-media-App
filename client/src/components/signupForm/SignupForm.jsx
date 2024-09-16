import React, { useRef, useState } from 'react';
import './SignupForm.css'; // Add your custom styles
import { signup } from '../../services/authService';
import { Link } from 'react-router-dom';
function SignupForm() {
    // Create refs for each input field
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        signup: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate form data
    function validateFormData () {
        const newErrors = {};
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!firstName) newErrors.firstName = 'First name is required!';
        if (!lastName) newErrors.lastName = 'Last name is required!';
        if (!email) newErrors.email = 'Email is required!';
        else if ( !isValidGmail(email) ) newErrors.email = 'Email address is invalid!';
        if (!password) newErrors.password = 'Password is required!';
        if ( !isValidPassword(password) ){
            newErrors.password = 'Password must contain at least 8 characters including an uppercase, a lowercase, a number and a special character';
        }
        if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

        return newErrors;
    };

    // Check if email is a valid Gmail address
    function isValidGmail(email) {
        const gmailPattern = /^[^\s@]+@gmail\.com$/;    
        return gmailPattern.test(email);
    }

    function isValidPassword(password) {
        // Regex to check for at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        console.log(password)
        return regex.test(password);
    }

    function handleChange(event){
        if(event.target == firstNameRef.current && errors.firstName)
            setErrors({...errors, firstName: ''});
        else if(event.target == lastNameRef.current && errors.lastName)
            setErrors({...errors, lastName: ''});
        else if(event.target == emailRef.current && errors.email)
            setErrors({...errors, email: ''});
        else if(event.target == passwordRef.current && errors.password)
            setErrors({...errors, password: ''});
        else if(event.target == confirmPasswordRef.current && errors.confirmPassword)
            setErrors({...errors, confirmPassword: ''});

        if(errors.signup)
            setErrors({...errors, signup:''});
    }   

    // Handle form submission
    async function handleSubmit (event) {
        event.preventDefault();
        const validationErrors = validateFormData();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try{
            setErrors({});
            setIsSubmitting(true);
            
            const result = await signup(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, passwordRef.current.value);
            // alert('Signup successful, Please Login');
            
            /////////////////////////
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000)

            // // Simulate an API call
            
        }catch(error){
            console.log("This is the catch block:" + error.message);
            setErrors({ ...errors, signup: error.message });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            ref={firstNameRef}
                            className={errors.firstName ? 'error-input' : ''}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            ref={lastNameRef}
                            className={errors.lastName ? 'error-input' : ''}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        className={errors.email ? 'error-input' : ''}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        className={errors.password ? 'error-input' : ''}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        className={errors.confirmPassword ? 'error-input' : ''}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    {errors.signup && <p className="error-message">{errors.signup}</p>}
                </div>

                <button type="submit" className="signup-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
                <hr />
                <p className='login-text'>Already have an account? <Link className='link' to={'/'}>LogIn</Link></p>
            </form>
        </div>
    );
}

export default SignupForm;

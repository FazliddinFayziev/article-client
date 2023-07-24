// components/RegisterForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/redux/article/userSlice';

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, data } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(registerUser(user));
    };

    const handleSuccessfulRegistration = (userId: string, token: string) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        navigate('/home');
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="register-title">Register</h2>
            <div className="input-container">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="register-button" disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
            </button>
            <Link className="login-link" to={'/login'}>
                Already have an account
            </Link>
            {error && <p className="error-message">{error}</p>}
            {data && handleSuccessfulRegistration(data.userId, data.token)}
        </form>
    );
};

export default RegisterForm;

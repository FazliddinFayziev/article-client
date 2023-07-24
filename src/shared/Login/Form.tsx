import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/redux/article/userSlice';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);
    const userProfile = useSelector((state) => state.profile);

    const { loading, error, data } = useSelector((state) => state.user);
    const isAdmin = data?.isAdmin; // Use optional chaining to access isAdmin property

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginUser(user));
    };

    useEffect(() => {
        if (data && !redirected) {
            handleSuccessfulLogin(data.userId, data.token);
            setRedirected(true);
        }
    }, [data, redirected]);

    const handleSuccessfulLogin = (userId: string, token: string) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        // Check if the user is an admin
        if (isAdmin) {
            navigate('/admin');
        } else {
            navigate('/home');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>
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
            <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
            <Link className="register-link" to={'/register'}>
                Register
            </Link>
            {error && <p className="error-message">{error}</p>}
            {data && handleSuccessfulLogin(data.userId, data.token)}
            <p className='admin'>For checking Admin Panel</p>
            <p className='admin'>Admin-Email: <span>admin@gmail.com</span></p>
            <p className='admin'>Admin-Password: <span>admin</span></p>
        </form>
    );
};

export default LoginForm;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }
    return (
        <header className="navbar">
            <div className="navbar-logo">
                {/* logo image URL */}
                <img src="https://logovectordl.com/wp-content/uploads/2021/03/article-logo-vector.png" alt="Logo" />
            </div>
            <nav className="navbar-links">
                <Link to={'/'} className="active">Home</Link>
                <a style={{ cursor: 'pointer' }} onClick={handleClick} className="non-active">Sign in</a>
                <Link to={'/register'} className="non-active">Sign up</Link>
            </nav>
        </header>
    );
};

export default Header;

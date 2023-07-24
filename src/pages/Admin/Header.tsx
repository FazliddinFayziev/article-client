import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                {/* logo image URL */}
                <img src="https://logovectordl.com/wp-content/uploads/2021/03/article-logo-vector.png" alt="Logo" />
            </div>
            <nav className="navbar-links">
                <Link to={'/home'} className="active">Home</Link>
            </nav>
        </header>
    );
};

export default Header;

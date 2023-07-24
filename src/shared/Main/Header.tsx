import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="navbar">
            <Link to={"/home"} className="navbar-logo">
                {/* logo image URL */}
                <img src="https://logovectordl.com/wp-content/uploads/2021/03/article-logo-vector.png" alt="Logo" />
            </Link>
            <nav className="navbar-links">
                <Link to={'/admin'} className="active">Admin</Link>
                <Link to={'/profile'} className="active">Profile</Link>
                <Link to={'/add'} className="active">Add Article</Link>
            </nav>
        </header>
    );
};

export default Header;

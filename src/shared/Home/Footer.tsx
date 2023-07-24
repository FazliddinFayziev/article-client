import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <h3>ARTICLE .</h3>
            </div>
            <div className="footer-text">
                All rights reserved. © {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;

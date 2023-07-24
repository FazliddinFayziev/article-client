import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Main.css";
import Header from '../../shared/Main/Header';
import Banner from '../../shared/Main/Banner';
import Articles from '../../shared/Main/Articles';
import Footer from '../../shared/Main/Footer';

const Main: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        // If userId and token are not available in localStorage, navigate to the register page
        if (!userId || !token) {
            navigate('/register');
        }
    }, [navigate]);

    return (
        <div className='main-app'>
            <Header />
            <Banner />
            <Articles />
            <Footer />
        </div>
    );
};

export default Main;

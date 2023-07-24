import React from 'react';
import './Home.css';
import Header from '../../shared/Home/Header';
import Banner from '../../shared/Home/Banner';
import Popular from '../../shared/Home/Popular';
import Footer from '../../shared/Home/Footer';

const Home: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Banner />
            <Popular />
            <Footer />
        </div>
    );
};

export default Home;

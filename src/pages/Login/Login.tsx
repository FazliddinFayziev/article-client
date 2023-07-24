import React from 'react';
import './Login.css';
import LoginForm from '../../shared/Login/Form';
import Header from '../../shared/Home/Header';

const Login: React.FC = () => {

    return (
        <>
            <Header />
            <div className="login-container">
                <LoginForm />
            </div>
        </>
    );
};

export default Login;

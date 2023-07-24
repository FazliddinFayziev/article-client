import React from 'react';
import './Register.css';
import RegisterForm from '../../shared/Register/Form';
import Header from '../../shared/Home/Header';

const Register: React.FC = () => {

    return (
        <>
            <Header />
            <div className='register-container'>
                <RegisterForm />
            </div>
        </>
    );
};

export default Register;

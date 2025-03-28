import React from 'react';
import LoginImageSection from '../../components/login/LoginImageSection';
import LoginFormSection from '../../components/login/LoginFormSection';

const Login = () => {
    return (
        <div className="flex flex-wrap min-h-screen">
            <LoginImageSection />
            <LoginFormSection />
        </div>
    );
};

export default Login;
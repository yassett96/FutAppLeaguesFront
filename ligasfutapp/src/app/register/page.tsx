import React from 'react';
import RegisterFormSection from '../../components/register/RegisterFormSection';
import RegisterImageSection from '../../components/register/RegisterImageSection';

const Register = () => {
    return (
        <div className="flex flex-wrap min-h-screen">
            <RegisterImageSection />
            <RegisterFormSection />            
        </div>
    );
};

export default Register;
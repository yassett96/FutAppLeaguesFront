import React from 'react';
import ForgotPasswordFormSection from '../../components/forgot-password/ForgotPasswordFormSection';
import ForgotPasswordImageSection from '../../components/forgot-password/ForgotPasswordImageSection';

const Register = () => {
    return (
        <div className="flex flex-wrap min-h-screen">
            <ForgotPasswordImageSection />
            <ForgotPasswordFormSection />            
        </div>
    );
};

export default Register;
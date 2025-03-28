"use client"
import dynamic from "next/dynamic";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RingLoader } from "react-spinners";
// import NewPasswordImageSection from '../../components/new_password/NewPasswordImageSection';
// import NewPasswordFormSection from '../../components/new_password/NewPasswordFormSection';
const NewPasswordFormSection = dynamic(
    () => import("../../components/new_password/NewPasswordFormSection"),
    { ssr: false }
);

const NewPasswordContent = () => {
    const searchParams = useSearchParams();
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        const id = searchParams.get("id_usuario");
        setIdUsuario(id);
    }, [searchParams]);

    if (!idUsuario) {
        return <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
          zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
        }}
        className="flex items-center justify-center"
      >
        <RingLoader color="#007bff" />
      </div>;
    }

    return (
        <div className="flex flex-wrap min-h-screen">
            {/* <NewPasswordImageSection /> */}
            <NewPasswordFormSection idUsuario={idUsuario} />
        </div>
    );
};

const NewPassword = () => {
    return (
        <Suspense fallback={<div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
                zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
            }}
            className="flex items-center justify-center"
        >
            <RingLoader color="#007bff" />
        </div>}>
            <NewPasswordContent />
        </Suspense>
    );
};

export default NewPassword;
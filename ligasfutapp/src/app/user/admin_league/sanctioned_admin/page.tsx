"use client"
import React, { Suspense } from 'react';
import { RingLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import Sancionado_Admin from '@/shared_screens/sanctioned_admin/page';

const Sancionado_AdminContentHead = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Sancionado_Admin userRole={userRole} />
    );
};

const Sancionado_AdminHead = () => {
    return (
        <Suspense fallback={
            <div
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
            </div>
        }>
            <Sancionado_AdminContentHead />
        </Suspense>
    );
};

export default Sancionado_AdminHead;
"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RingLoader } from 'react-spinners';
import Equipo_Admin from '@/shared_screens/team_admin/page';

const Equipo_AdminContentHead = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Equipo_Admin userRole={userRole} />
    );
};

const Equipo_AdminHead = () => {
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
            <Equipo_AdminContentHead />
        </Suspense>
    );
};

export default Equipo_AdminHead;
"use client"
import React, { Suspense } from 'react';
import { RingLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import Planillero_Admin from '@/shared_screens/planner_admin/page';

const Planillero_AdminContentHead = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Planillero_Admin userRole={userRole} />
    );
};

const Planillero_AdminHead = () => {
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
            <Planillero_AdminContentHead />
        </Suspense>
    );
};

export default Planillero_AdminHead;
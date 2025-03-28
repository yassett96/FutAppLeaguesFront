"use client"
import React, { createContext, useContext, useState, Suspense, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import Torneo_Admin from '@/shared_screens/tournament_admin/page';

// Contexto de Scroll
const ScrollContext = createContext(null);

const Torneo_AdminContentHead = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Torneo_Admin userRole={userRole} />
    );
};

const Torneo_AdminHead = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Restaurar la posición del scroll después de que el componente se renderice
        window.scrollTo(0, scrollY);
    }, [scrollY]);

    return (
        <ScrollContext.Provider value={{ setScrollY }}>
            <Suspense
                fallback={
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
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            zIndex: '9999',
                        }}
                        className="flex items-center justify-center"
                    >
                        <RingLoader color="#007bff" />
                    </div>
                }
            >
                <Torneo_AdminContentHead />
            </Suspense>
        </ScrollContext.Provider>
    );
};

export default Torneo_AdminHead;
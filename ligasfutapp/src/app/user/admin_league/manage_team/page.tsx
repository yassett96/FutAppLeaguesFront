"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Gestionar from '@/shared_screens/manage_team/page';

const GestionarHead: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerGestionarContentHead />
            </Suspense>
        </div>
    );
};

const InnerGestionarContentHead: React.FC = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Gestionar userRole={userRole} />
    );
};

export default GestionarHead;
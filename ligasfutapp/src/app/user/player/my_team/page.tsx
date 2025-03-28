"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MiEquipo from '@/shared_screens/my_team/page';

const MiEquipoHead: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6 text-black text-shadow-lg">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerMiEquipoHeadHead />
            </Suspense>
        </div>
    );
};

const InnerMiEquipoHeadHead: React.FC = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <MiEquipo userRole={userRole} />
    );
};

export default MiEquipoHead;
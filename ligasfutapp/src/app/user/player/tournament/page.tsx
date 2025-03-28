"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TorneoJugador from '@/shared_screens/tournament/page';

const TorneoJugadorHead: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6 text-black text-shadow-lg">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerTorneoJugadorHead />
            </Suspense>
        </div>
    );
};

const InnerTorneoJugadorHead: React.FC = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <TorneoJugador userRole={userRole} />
    );
};

export default TorneoJugadorHead;
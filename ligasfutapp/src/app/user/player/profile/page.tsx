"use client";
import PerfilJugador from '@/shared_screens/profile/page';
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

const PerfilJugadorHead: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerPerfilJugadorHead />
            </Suspense>
        </div>
    );
};

const InnerPerfilJugadorHead: React.FC = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <PerfilJugador userRole={userRole} />
    );
};

export default PerfilJugadorHead;
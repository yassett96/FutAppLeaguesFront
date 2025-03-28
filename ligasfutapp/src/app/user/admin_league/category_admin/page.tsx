"use client";
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import CategoryGrid from '../../../../components/user/admin_league/category_admin/CategoryGrid';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import PopUpAddCategory from '../../../../components/user/admin_league/category_admin/pop-up_add_category/page';
import PopUpEditCategory from '@/components/user/admin_league/category_admin/pop-up_edit_category/page';
import { RingLoader } from 'react-spinners';
import SelectLeague from '@/components/user/admin_league/category_admin/SelectLeague';
import Image from 'next/image';
import { menuOptionsAdminLeague } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { useSearchParams, useRouter } from 'next/navigation';
// import { obtenerCategoriasPorAdminLiga } from '@/services/ligaCategoriaService';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import Categoria_Admin from '@/shared_screens/category_admin/page';

const Categoria_AdminContentHead = () => {
    const searchParams = useSearchParams();

    const userRole = searchParams.get('role');

    return (
        <Categoria_Admin userRole={userRole} />
    );
};

const Categoria_AdminHead = () => {
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
            <Categoria_AdminContentHead />
        </Suspense >
    );
};

export default Categoria_AdminHead;

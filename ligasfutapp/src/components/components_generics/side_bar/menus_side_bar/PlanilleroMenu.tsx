import React from 'react';
import { IoDocumentText, IoPeople, IoChatbox, IoList } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const PlanilleroMenu: React.FC<{ isOpen: boolean; isHovered: boolean; menuDisabled: boolean; idPartido: number; userType: string }> = ({ isOpen, isHovered, menuDisabled, idPartido, userType }) => {
    const router = useRouter();

    return (
        <>
            <button
                className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={menuDisabled}
                onClick={() =>{
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_signature.html?role=${userType}&id_p=${idPartido}`)
                    } else {
                        router.push(`/user/planner/match_signature/?role=${userType}&id_p=${idPartido}`)
                    }
                    // router.push(`/user/planner/match_signature/?role=${userType}&id_p=${idPartido}`)
                }}
            >
                <IoDocumentText className={`mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`} size={20} />
                <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    Firma
                </span>
            </button>
            <button
                className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={menuDisabled}
                onClick={() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_data.html?role=${userType}&id_p=${idPartido}`)
                    } else {
                        router.push(`/user/planner/match_data/?role=${userType}&id_p=${idPartido}`)
                    }
                    // router.push(`/user/planner/match_data/?role=${userType}&id_p=${idPartido}`)
                }}
            >
                <IoPeople className={`mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`} size={20} />
                <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    Datos
                </span>
            </button>
            <button
                className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={menuDisabled}
                onClick={() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_comment.html?role=${userType}&id_p=${idPartido}`)
                    } else {
                        router.push(`/user/planner/match_comment/?role=${userType}&id_p=${idPartido}`)
                    }
                    // router.push(`/user/planner/match_comment/?role=${userType}&id_p=${idPartido}`)
                }}
            >
                <IoChatbox className={`mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`} size={20} />
                <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    Comentarios
                </span>
            </button>
            <button
                className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={menuDisabled}
                onClick={() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_resume_chronology.html?role=${userType}&id_p=${idPartido}`)
                    } else {
                        router.push(`/user/planner/match_resume_chronology/?role=${userType}&id_p=${idPartido}`)
                    }
                    // router.push(`/user/planner/match_resume_chronology/?role=${userType}&id_p=${idPartido}`)
                }}
            >
                <IoList className={`mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`} size={20} />
                <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    Resumen
                </span>
            </button>
        </>
    );
};

export default PlanilleroMenu;
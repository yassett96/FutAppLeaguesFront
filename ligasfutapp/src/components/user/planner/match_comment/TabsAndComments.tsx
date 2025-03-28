import React, { useState, useEffect } from 'react';

// Componente para los botones de selección (Tabs)
const SelectionButtons = ({ selectedButton, onButtonClick, equipoLocal, equipoVisitante }) => {
    const uniqueEquipoLocal = equipoLocal || 'Equipo Local';
    const uniqueEquipoVisitante = equipoVisitante || 'Equipo Visitante';

    return (
        <div className="flex justify-center rounded-t-lg overflow-hidden bg-white border border-gray-300">
            {['Árbitro', `Capitán ${uniqueEquipoLocal}`, `Capitán ${uniqueEquipoVisitante}`].map((button) => (
                <button
                    key={button}
                    className={`flex-grow px-4 py-2 text-[9px] w-[30%] sm590:text-sm sm670:text-xl font-semibold transition-colors duration-200 ${selectedButton === button
                            ? 'text-blue-500 border-b-4 border-blue-500'
                            : 'text-gray-600 border-b-2 border-transparent hover:text-blue-400 hover:border-gray-300'
                        }`}
                    onClick={() => onButtonClick(button)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

// Componente para el formulario de comentarios (Textarea)
const CommentForm = ({ comment, onCommentChange }) => {
    return (
        <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm590:text-2xl"
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
        ></textarea>
    );
};

// Componente principal que maneja las pestañas y el textarea dinámico
const TabsAndComments = ({ equipoLocal, equipoVisitante, initialComments, onCommentsChange }) => {
    const uniqueEquipoLocal = equipoLocal || 'Equipo Local';
    const uniqueEquipoVisitante = equipoVisitante || 'Equipo Visitante';

    // Estado para manejar la pestaña seleccionada y los comentarios
    const [selectedButton, setSelectedButton] = useState('Árbitro');
    const [comments, setComments] = useState(() => ({
        'Árbitro': initialComments?.comentarioArbitro || '',
        [`Capitán ${uniqueEquipoLocal}`]: initialComments?.comentarioCapitanLocal || '',
        [`Capitán ${uniqueEquipoVisitante}`]: initialComments?.comentarioCapitanVisitante || '',
    }));

    // Inicialización de comentarios
    useEffect(() => {
        setComments(prevComments => ({
            Árbitro: initialComments?.comentarioArbitro ?? prevComments['Árbitro'],
            [`Capitán ${equipoLocal || 'Equipo Local'}`]: initialComments?.comentarioCapitanLocal ?? prevComments[`Capitán ${equipoLocal || 'Equipo Local'}`],
            [`Capitán ${equipoVisitante || 'Equipo Visitante'}`]: initialComments?.comentarioCapitanVisitante ?? prevComments[`Capitán ${equipoVisitante || 'Equipo Visitante'}`],
        }));
    }, [initialComments, equipoLocal, equipoVisitante]);

    // Enviar los comentarios actualizados al componente padre
    useEffect(() => {
        if (onCommentsChange) {
            onCommentsChange(comments);
        }
    }, [comments, onCommentsChange]);

    // Manejador de cambio de pestaña
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    // Manejador de cambio de comentario
    const handleCommentChange = (newComment) => {
        setComments((prevComments) => ({
            ...prevComments,
            [selectedButton]: newComment,
        }));
    };

    return (
        <div className="w-[100%] sm670:w-[60%] mx-auto">
            {/* Componente de botones para cambiar las pestañas */}
            <SelectionButtons
                selectedButton={selectedButton}
                onButtonClick={handleButtonClick}
                equipoLocal={uniqueEquipoLocal}
                equipoVisitante={uniqueEquipoVisitante}
            />

            {/* Componente del formulario de comentarios (Textarea dinámico) */}
            <CommentForm comment={comments[selectedButton]} onCommentChange={handleCommentChange} />
        </div>
    );
};

export default TabsAndComments;

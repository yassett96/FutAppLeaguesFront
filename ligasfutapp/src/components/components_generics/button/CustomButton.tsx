import React, { useState } from 'react';

const CustomButton = ({ text, color, width, height, onClick, className, icon, classNameText = "", classNameIcon = "w-6 h-6", disabled = false }) => {
    const [hoverColor, setHoverColor] = useState(color);
    const [rippleStyle, setRippleStyle] = useState({});
    const [isRippling, setIsRippling] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        const darkenColor = darkenHexColor(color, -10);
        setHoverColor(darkenColor);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setHoverColor(color);
        setIsHovered(false);
    };

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        setRippleStyle({
            width: `${size}px`,
            height: `${size}px`,
            top: `${y}px`,
            left: `${x}px`,
        });

        setIsRippling(true);

        setTimeout(() => {
            setIsRippling(false);
        }, 600); // Duración del ripple

        if (onClick) {
            onClick(); // Llama a la función que se pasa desde el componente padre
        }
    };

    const darkenHexColor = (hex, percent) => {
        let num = parseInt(hex.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = ((num >> 8) & 0x00ff) + amt,
            B = (num & 0x0000ff) + amt;
        return (
            "#" +
            (0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255))
                .toString(16)
                .slice(1)
        );
    };

    const isIconJSX = typeof icon !== 'string'; // Detecta si `icon` es una URL de imagen o un componente JSX

    return (
        <button
            className={`custom-button p-3 shadow-lg flex items-center justify-center ${className}`}
            style={{
                backgroundColor: hoverColor,
                width: width,
                height: height,
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden', // Para ocultar el ripple que sale del botón
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            disabled={disabled}
        >
            {isRippling && (
                <span
                    className="ripple"
                    style={{
                        ...rippleStyle,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Color blanquecino para el ripple
                    }}
                />
            )}

            {/* Mostrar el ícono JSX o una imagen */}
            {icon && (
                <span className="w-full flex itmes-center justify-center">
                    {isIconJSX ? (
                        // Si es un componente JSX (como IoDocumentText)
                        React.cloneElement(icon, { className: `mr-2 ${isHovered ? 'ml-0' : '-ml-2'}`, size: 20 })
                    ) : (
                        // Si es una URL de imagen
                        <img src={icon} alt="icon" className={`${classNameIcon}`} />
                    )}
                </span>
            )}

            <span className={`button-text text-center ${classNameText}`}>
                {text}
            </span>
        </button>
    );
};

export default CustomButton;

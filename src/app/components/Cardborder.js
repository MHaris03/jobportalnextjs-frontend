'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const CardBorder = ({ title, content, style, icon, open }) => {
    const [isOpen, setIsOpen] = useState(open);
    const contentRef = useRef(null);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-white border border-gray-200 border-l-4 border-l-blue rounded-md shadow-sm overflow-hidden transition-all duration-300 ${style}`}>
            <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={toggleAccordion}
            >
                <div className="flex items-center gap-2">
                    <h3 className={`font-medium text-base ${isOpen ? 'text-blue' : 'text-gray-800'}`}>
                        {title}
                    </h3>
                    {icon && <img src={icon} alt="icon" height={20} width={25} />}
                </div>
                <div
                    className={`h-7 w-7 flex justify-center items-center rounded-full transition-all duration-300 ${isOpen ? 'border border-blue text-blue rotate-180' : 'bg-blue text-white'
                        }`}
                >
                    {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
                </div>
            </div>

            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                }}
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
            >
                <div
                    className={`px-4 py-3 text-sm text-gray-600 transition-opacity duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CardBorder;

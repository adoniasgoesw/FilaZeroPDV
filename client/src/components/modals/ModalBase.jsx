import { useEffect, useRef } from 'react';
import Back from '../buttons/Back.jsx';
import SaveButton from '../buttons/SaveButton.jsx';
import CancelButton from '../buttons/CancelButton.jsx';

export default function ModalBase({ isOpen, onClose, children, title, onSave, saveLabel = 'Salvar', formId }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSave = (e) => {
        e.preventDefault();
        
        // Tenta encontrar o form dentro do conteúdo
        if (contentRef.current) {
            const form = contentRef.current.querySelector('form');
            if (form) {
                form.requestSubmit();
                return;
            }
        }
        
        // Se não encontrou o form, chama onSave se fornecido
        if (onSave) {
            onSave();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-[35%] bg-white shadow-2xl z-[70] flex flex-col overflow-hidden animate-slide-in-right">
                {/* Header com Back button */}
                <div className="flex-shrink-0 px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-3 md:gap-4">
                        <Back 
                            variant="icon"
                            onClick={onClose}
                        />
                        {title && (
                            <h2 className="text-base md:text-lg font-normal text-gray-700">
                                {title}
                            </h2>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div ref={contentRef} className="flex-1 overflow-y-auto pb-24">
                    {children}
                </div>

                {/* Footer com botões fixo no bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex-shrink-0 px-4 md:px-6 py-3 md:py-4 bg-white border-t border-gray-100 shadow-sm">
                    <div className="flex gap-3">
                        <CancelButton onClick={onClose} />
                        <SaveButton onClick={handleSave} label={saveLabel} />
                    </div>
                </div>
            </div>
        </>
    );
}


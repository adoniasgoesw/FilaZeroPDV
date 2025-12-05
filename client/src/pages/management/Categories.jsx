import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layouts/Sidebar.jsx';
import Footer from '../../components/layouts/Footer.jsx';
import SearchBar from '../../components/layouts/SearchBar.jsx';
import AddButton from '../../components/buttons/AddButton.jsx';
import Back from '../../components/buttons/Back.jsx';
import ModalBase from '../../components/modals/ModalBase.jsx';
import FormCategory from '../../components/forms/FormCategory.jsx';
import ListCategories from '../../components/lists/ListCategories.jsx';
import api from '../../services/api.js';

export default function Categories() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [businessId, setBusinessId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const bid = localStorage.getItem('businessId');

        if (!userId || !bid) {
            navigate('/');
            return;
        }

        setBusinessId(bid);
    }, [navigate]);

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('business_id', businessId);
            formDataToSend.append('name', formData.name);
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            if (editingCategory) {
                // Atualizar categoria
                formDataToSend.append('id', editingCategory.id);
                await api.put('/categories', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Criar categoria
                await api.post('/categories', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            setIsModalOpen(false);
            setEditingCategory(null);
            // Recarregar lista
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
            alert('Erro ao salvar categoria. Tente novamente.');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-hidden h-full page-content flex flex-col">
                <div className="px-4 md:px-6 py-4 md:py-6 flex-shrink-0 relative z-0">
                    <div className="flex items-center gap-4 mb-6">
                        <Back 
                            variant="icon"
                            onClick={() => navigate(-1)}
                        />
                        <SearchBar 
                            placeholder="Pesquisar categorias..." 
                            onSearch={handleSearch}
                        />
                        <AddButton 
                            onClick={handleAdd}
                            label="Adicionar categoria"
                        />
                    </div>
                </div>

                <div className="flex-1 px-4 md:px-6 pb-4 md:pb-6 overflow-y-auto z-10">
                    {businessId && (
                        <ListCategories 
                            businessId={businessId}
                            onEdit={handleEdit}
                            onDelete={() => setRefreshTrigger(prev => prev + 1)}
                            refreshTrigger={refreshTrigger}
                        />
                    )}
                </div>
            </div>
            <Footer />
            
            {/* Modal */}
            <ModalBase 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}
                formId="form-category"
            >
                <FormCategory 
                    onSubmit={handleSubmit} 
                    initialData={editingCategory}
                    onCancel={handleCloseModal}
                />
            </ModalBase>
        </div>
    );
}


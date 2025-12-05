import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layouts/Sidebar.jsx';
import Footer from '../../components/layouts/Footer.jsx';
import SearchBar from '../../components/layouts/SearchBar.jsx';
import AddButton from '../../components/buttons/AddButton.jsx';
import Back from '../../components/buttons/Back.jsx';
import Tabs from '../../components/layouts/Tabs.jsx';
import ListProducts from '../../components/lists/ListProducts.jsx';
import ListComplementos from '../../components/lists/ListComplementos.jsx';
import ModalBase from '../../components/modals/ModalBase.jsx';
import FormProduct from '../../components/forms/FormProduct.jsx';
import FormComplement from '../../components/forms/FormComplement.jsx';

import api from '../../services/api.js';

export default function Products() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [businessId, setBusinessId] = useState(null);
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

    const tabs = [
        { id: 'products', label: 'Produtos' },
        { id: 'complementos', label: 'Complementos' }
    ];

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('business_id', businessId);
            formDataToSend.append('category_id', formData.categoryId);
            formDataToSend.append('name', formData.name);
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            if (formData.purchasePrice) {
                formDataToSend.append('purchase_price', formData.purchasePrice);
            }
            if (formData.salePrice) {
                formDataToSend.append('sale_price', formData.salePrice);
            }
            if (formData.stock) {
                formDataToSend.append('stock', formData.stock);
            }
            if (formData.preparationTime) {
                formDataToSend.append('preparation_time', formData.preparationTime);
            }

            if (editingProduct) {
                // Atualizar produto
                formDataToSend.append('id', editingProduct.id);
                await api.put('/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Criar produto
                await api.post('/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            setIsModalOpen(false);
            setEditingProduct(null);
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert('Erro ao salvar produto. Tente novamente.');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSearch = (term) => {
        console.log('Pesquisar:', term);
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-hidden h-full page-content flex flex-col">
                <div className="px-4 md:px-6 py-4 md:py-6 flex-shrink-0">
                    <div className="flex items-center gap-4 mb-4">
                        <Back 
                            variant="icon"
                            onClick={() => navigate('/settings')}
                        />
                        <SearchBar 
                            placeholder={activeTab === 'products' ? 'Pesquisar produtos...' : 'Pesquisar complementos...'} 
                            onSearch={handleSearch}
                        />
                        <AddButton 
                            onClick={handleAdd}
                            label={activeTab === 'products' ? 'Adicionar produto' : 'Adicionar complemento'}
                        />
                    </div>
                    
                    {/* Abas */}
                    <div className="mb-4">
                        <Tabs 
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>
                </div>

                <div className="flex-1 px-4 md:px-6 pb-4 md:pb-6 overflow-hidden">
                    {activeTab === 'products' ? (
                        businessId && (
                            <ListProducts 
                                businessId={businessId}
                                onEdit={handleEdit}
                                onDelete={() => setRefreshTrigger(prev => prev + 1)}
                                refreshTrigger={refreshTrigger}
                            />
                        )
                    ) : (
                        <ListComplementos />
                    )}
                </div>
            </div>
            <Footer />
            
            {/* Modal */}
            <ModalBase 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={activeTab === 'products' ? (editingProduct ? 'Editar Produto' : 'Adicionar Produto') : 'Adicionar Complemento'}
                formId="form-product"
            >
                {activeTab === 'products' ? (
                    <FormProduct 
                        onSubmit={handleSubmit} 
                        initialData={editingProduct}
                        businessId={businessId}
                    />
                ) : (
                    <FormComplement onSubmit={handleSubmit} />
                )}
            </ModalBase>
        </div>
    );
}


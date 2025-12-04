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

export default function Products() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');

        if (!userId || !businessId) {
            navigate('/');
            return;
        }
    }, [navigate]);

    const tabs = [
        { id: 'products', label: 'Produtos' },
        { id: 'complementos', label: 'Complementos' }
    ];

    const handleAdd = () => {
        if (activeTab === 'products') {
            console.log('Adicionar novo produto');
        } else {
            console.log('Adicionar novo complemento');
        }
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
                    {activeTab === 'products' ? <ListProducts /> : <ListComplementos />}
                </div>
            </div>
            <Footer />
        </div>
    );
}


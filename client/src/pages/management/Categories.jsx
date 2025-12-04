import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layouts/Sidebar.jsx';
import Footer from '../../components/layouts/Footer.jsx';
import SearchBar from '../../components/layouts/SearchBar.jsx';
import AddButton from '../../components/buttons/AddButton.jsx';
import Back from '../../components/buttons/Back.jsx';

export default function Categories() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');

        if (!userId || !businessId) {
            navigate('/');
            return;
        }
    }, [navigate]);

    const handleAdd = () => {
        console.log('Adicionar nova categoria');
    };

    const handleSearch = (term) => {
        console.log('Pesquisar:', term);
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-y-auto h-full page-content">
                <div className="px-4 md:px-6 py-4 md:py-6">
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

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <p className="text-gray-500">Conteúdo de categorias será exibido aqui...</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


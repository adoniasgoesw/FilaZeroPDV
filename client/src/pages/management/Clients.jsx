import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layouts/Sidebar.jsx';
import Footer from '../../components/layouts/Footer.jsx';
import SearchBar from '../../components/layouts/SearchBar.jsx';
import AddButton from '../../components/buttons/AddButton.jsx';
import Back from '../../components/buttons/Back.jsx';
import ListClients from '../../components/lists/ListClients.jsx';
import ModalBase from '../../components/modals/ModalBase.jsx';
import FormClient from '../../components/forms/FormClient.jsx';

export default function Clients() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const businessId = localStorage.getItem('businessId');

        if (!userId || !businessId) {
            navigate('/');
            return;
        }
    }, [navigate]);

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        console.log('Dados do formulário:', data);
        // Aqui você pode adicionar a lógica para salvar
        setIsModalOpen(false);
    };

    const handleSearch = (term) => {
        console.log('Pesquisar:', term);
        // Aqui você pode adicionar lógica de pesquisa
    };

    return (
        <div className="safe-viewport bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 mobile-ml-0 max-w-[1920px] mx-auto w-full mobile-pb-20 overflow-hidden h-full page-content flex flex-col">
                <div className="px-4 md:px-6 py-4 md:py-6 flex-shrink-0">
                    {/* Header com botão back, search bar e botão ADD */}
                    <div className="flex items-center gap-4">
                        <Back 
                            variant="icon"
                            onClick={() => navigate('/settings')}
                        />
                        <SearchBar 
                            placeholder="Pesquisar clientes..." 
                            onSearch={handleSearch}
                        />
                        <AddButton 
                            onClick={handleAdd}
                            label="Adicionar cliente"
                        />
                    </div>
                </div>

                {/* Lista ocupando 100% da altura restante */}
                <div className="flex-1 px-4 md:px-6 pb-4 md:pb-6 overflow-hidden">
                    <ListClients />
                </div>
            </div>
            <Footer />
            
            {/* Modal */}
            <ModalBase 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Adicionar Cliente"
            >
                <FormClient onSubmit={handleSubmit} />
            </ModalBase>
        </div>
    );
}


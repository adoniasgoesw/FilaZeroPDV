import { useNavigate } from 'react-router-dom';
import ManagementCard from './ManagementCard.jsx';

export default function ManagementGrid() {
    const navigate = useNavigate();
    const cards = ['clients', 'users', 'payment', 'categories', 'products'];

    const handleCardClick = (type) => {
        const routes = {
            clients: '/management/clients',
            users: '/management/users',
            payment: '/management/payments',
            categories: '/management/categories',
            products: '/management/products'
        };
        
        if (routes[type]) {
            navigate(routes[type]);
        }
    };

    // Mobile: 2 colunas (3 na primeira coluna, 2 na segunda) - cards quadrados
    // Tablet: 4 colunas (2 na primeira, 1 em cada das outras 3) - cards quadrados
    // Desktop: 5 colunas (1 em cada) - cards quadrados
    // Todos usam o mesmo tamanho quadrado do tablet
    return (
        <>
            {/* Mobile layout: 2 colunas com 3-2 - cards quadrados */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
                <div className="flex flex-col gap-4">
                    {cards.slice(0, 3).map((cardType) => (
                        <ManagementCard
                            key={cardType}
                            type={cardType}
                            onClick={() => handleCardClick(cardType)}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    {cards.slice(3).map((cardType) => (
                        <ManagementCard
                            key={cardType}
                            type={cardType}
                            onClick={() => handleCardClick(cardType)}
                        />
                    ))}
                </div>
            </div>

            {/* Tablet layout: 4 colunas (2 na primeira, 1 em cada das outras 3) */}
            <div className="hidden md:grid lg:hidden grid-cols-4 gap-4">
                <div className="flex flex-col gap-4">
                    {cards.slice(0, 2).map((cardType) => (
                        <ManagementCard
                            key={cardType}
                            type={cardType}
                            onClick={() => handleCardClick(cardType)}
                        />
                    ))}
                </div>
                {cards.slice(2).map((cardType) => (
                    <ManagementCard
                        key={cardType}
                        type={cardType}
                        onClick={() => handleCardClick(cardType)}
                    />
                ))}
            </div>

            {/* Desktop layout: 5 colunas (1 em cada) - cards quadrados */}
            <div className="hidden lg:grid grid-cols-5 gap-4">
                {cards.map((cardType) => (
                    <ManagementCard
                        key={cardType}
                        type={cardType}
                        onClick={() => handleCardClick(cardType)}
                    />
                ))}
            </div>
        </>
    );
}


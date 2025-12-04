import { Users, UserCog, CreditCard, Tag, Package } from 'lucide-react';

const cardConfig = {
    clients: {
        icon: Users,
        title: 'Clientes',
        color: 'blue'
    },
    users: {
        icon: UserCog,
        title: 'Usuários',
        color: 'emerald'
    },
    payment: {
        icon: CreditCard,
        title: 'Pagamentos',
        color: 'purple'
    },
    categories: {
        icon: Tag,
        title: 'Categorias',
        color: 'orange'
    },
    products: {
        icon: Package,
        title: 'Produtos',
        color: 'pink'
    }
};

export default function ManagementCard({ type, onClick }) {
    const config = cardConfig[type];
    if (!config) return null;

    const Icon = config.icon;
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        pink: 'bg-pink-50 text-pink-600'
    };

    return (
        <button
            onClick={onClick}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center gap-4 w-full aspect-square"
        >
            <div className={`w-14 h-14 ${colorClasses[config.color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-7 h-7" />
            </div>
            <p className="text-base font-semibold text-gray-900 text-center leading-tight px-1">
                {config.title}
            </p>
        </button>
    );
}


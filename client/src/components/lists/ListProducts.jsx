import { useState } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';

// Dados fictícios
const mockProducts = [
    { id: 1, name: 'Hambúrguer Artesanal', category: 'Lanches', price: 'R$ 25,90', stock: 50, active: true, image: '🍔' },
    { id: 2, name: 'Pizza Margherita', category: 'Pizzas', price: 'R$ 35,00', stock: 30, active: true, image: '🍕' },
    { id: 3, name: 'Coca-Cola 350ml', category: 'Bebidas', price: 'R$ 5,50', stock: 100, active: true, image: '🥤' },
    { id: 4, name: 'Batata Frita', category: 'Acompanhamentos', price: 'R$ 12,00', stock: 0, active: false, image: '🍟' },
    { id: 5, name: 'Salada Caesar', category: 'Saladas', price: 'R$ 18,90', stock: 25, active: true, image: '🥗' },
    { id: 6, name: 'Água Mineral', category: 'Bebidas', price: 'R$ 3,00', stock: 200, active: true, image: '💧' },
    { id: 7, name: 'Pizza Calabresa', category: 'Pizzas', price: 'R$ 38,00', stock: 20, active: true, image: '🍕' },
    { id: 8, name: 'X-Burger', category: 'Lanches', price: 'R$ 15,90', stock: 40, active: true, image: '🍔' },
    { id: 9, name: 'Refrigerante Lata', category: 'Bebidas', price: 'R$ 4,50', stock: 150, active: true, image: '🥤' },
    { id: 10, name: 'Onion Rings', category: 'Acompanhamentos', price: 'R$ 14,00', stock: 15, active: false, image: '🧅' },
];

export default function ListProducts() {
    const [products, setProducts] = useState(mockProducts);
    const [selected, setSelected] = useState(new Set());

    const headers = ['Produto', 'Categoria', 'Valor Total', 'Estoque', 'Ações'];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(new Set(products.map(p => p.id)));
        } else {
            setSelected(new Set());
        }
    };

    const handleSelect = (id) => {
        const newSelected = new Set(selected);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelected(newSelected);
    };

    const handleStatusToggle = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, active: !product.active } : product
        ));
    };

    const handleEdit = (id) => {
        console.log('Editar produto:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleBulkToggleStatus = () => {
        const selectedIds = Array.from(selected);
        setProducts(products.map(product => 
            selectedIds.includes(product.id)
                ? { ...product, active: !product.active } 
                : product
        ));
    };

    const handleBulkEdit = () => {
        console.log('Editar selecionados:', Array.from(selected));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} produto(s)?`)) {
            setProducts(products.filter(product => !selected.has(product.id)));
            setSelected(new Set());
        }
    };

    const renderActionsButton = () => (
        <ActionsButton
            onToggleStatus={handleBulkToggleStatus}
            onEdit={handleBulkEdit}
            onDelete={handleBulkDelete}
        />
    );

    const renderCheckbox = (product) => (
        <input
            type="checkbox"
            checked={selected.has(product.id)}
            onChange={() => handleSelect(product.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );

    const renderRow = (product) => (
        <div className="flex items-center gap-2">
            <span className="text-base">{product.image}</span>
            <span className="text-xs font-medium text-gray-900">{product.name}</span>
        </div>
    );

    const renderAdditionalColumns = (product) => (
        <>
            <div className="text-xs text-gray-600">{product.category}</div>
            <div className="text-xs text-gray-600">{product.price}</div>
            <div className="text-xs text-gray-600">{product.stock}</div>
        </>
    );

    const actions = (product) => (
        <>
            <StatusButton 
                isActive={product.active} 
                onClick={() => handleStatusToggle(product.id)} 
            />
            <EditButton onClick={() => handleEdit(product.id)} />
            <DeleteButton onClick={() => handleDelete(product.id)} />
        </>
    );

    return (
        <div className="h-full">
            <ListBase 
                headers={headers}
                data={products}
                renderRow={renderRow}
                renderAdditionalColumns={renderAdditionalColumns}
                actions={actions}
                selectedCount={selected.size}
                totalCount={products.length}
                onSelectAll={handleSelectAll}
                renderCheckbox={renderCheckbox}
                renderActionsButton={renderActionsButton}
            />
        </div>
    );
}


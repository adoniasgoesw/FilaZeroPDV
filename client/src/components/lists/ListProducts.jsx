import { useState, useEffect } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';
import api from '../../services/api.js';

export default function ListProducts({ businessId, onEdit, onDelete, refreshTrigger }) {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId) {
            fetchProducts();
        }
    }, [businessId, refreshTrigger]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products', {
                params: { business_id: businessId }
            });
            
            if (response.data.products) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        if (!value) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const headers = ['Produto', 'Categoria', 'Valor Total', 'Estoque / Tempo', 'Ações'];

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

    const handleStatusToggle = async (id) => {
        try {
            const product = products.find(p => p.id === id);
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            
            await api.put('/products', {
                id: id,
                business_id: businessId,
                status: newStatus
            });
            
            // Atualizar localmente
            setProducts(products.map(p => 
                p.id === id ? { ...p, status: newStatus } : p
            ));
        } catch (error) {
            console.error('Erro ao alterar status:', error);
            alert('Erro ao alterar status. Tente novamente.');
        }
    };

    const handleEdit = (product) => {
        if (onEdit) {
            onEdit(product);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/products/${id}`, {
                    params: { business_id: businessId }
                });
                
                // Recarregar lista
                await fetchProducts();
                
                if (onDelete) {
                    onDelete();
                }
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
                alert('Erro ao deletar produto. Tente novamente.');
            }
        }
    };

    const handleBulkToggleStatus = async () => {
        const selectedIds = Array.from(selected);
        try {
            for (const id of selectedIds) {
                const product = products.find(p => p.id === id);
                const newStatus = product.status === 'active' ? 'inactive' : 'active';
                
                await api.put('/products', {
                    id: id,
                    business_id: businessId,
                    status: newStatus
                });
            }
            
            // Recarregar lista
            await fetchProducts();
            setSelected(new Set());
        } catch (error) {
            console.error('Erro ao alterar status em lote:', error);
            alert('Erro ao alterar status. Tente novamente.');
        }
    };

    const handleBulkEdit = () => {
        // Editar apenas o primeiro produto selecionado
        const selectedIds = Array.from(selected);
        if (selectedIds.length === 1) {
            const productId = selectedIds[0];
            const product = products.find(p => p.id === productId);
            if (product && onEdit) {
                onEdit(product);
                setSelected(new Set()); // Limpar seleção após abrir edição
            }
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} produto(s)?`)) {
            try {
                const selectedIds = Array.from(selected);
                for (const id of selectedIds) {
                    await api.delete(`/products/${id}`, {
                        params: { business_id: businessId }
                    });
                }
                
                // Recarregar lista
                await fetchProducts();
                setSelected(new Set());
            } catch (error) {
                console.error('Erro ao deletar produtos:', error);
                alert('Erro ao deletar produtos. Tente novamente.');
            }
        }
    };

    const renderActionsButton = () => {
        const selectedCount = selected.size;
        // Mostrar editar apenas se houver exatamente 1 produto selecionado
        const showEdit = selectedCount === 1;
        
        return (
            <ActionsButton
                onToggleStatus={handleBulkToggleStatus}
                onEdit={showEdit ? handleBulkEdit : null}
                onDelete={handleBulkDelete}
                showEdit={showEdit}
            />
        );
    };

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
            {product.image ? (
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-8 h-8 rounded object-contain bg-gray-100"
                />
            ) : (
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-400">📦</span>
                </div>
            )}
            <span className="text-xs font-medium text-gray-900">{product.name}</span>
        </div>
    );

    const renderAdditionalColumns = (product) => {
        // Estoque / Tempo: se tem estoque mostra estoque, senão mostra tempo
        const stockOrTime = product.stock > 0 
            ? `Estoque: ${product.stock}` 
            : product.preparationTime 
                ? `Tempo: ${product.preparationTime} min`
                : '-';

        return (
            <>
                <div className="text-xs text-gray-600">{product.categoryName || '-'}</div>
                <div className="text-xs text-gray-600 font-medium">{formatCurrency(product.salePrice)}</div>
                <div className="text-xs text-gray-600">{stockOrTime}</div>
            </>
        );
    };

    const actions = (product) => (
        <>
            <StatusButton 
                isActive={product.status === 'active'} 
                onClick={() => handleStatusToggle(product.id)} 
            />
            <EditButton onClick={() => handleEdit(product)} />
            <DeleteButton onClick={() => handleDelete(product.id)} />
        </>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Carregando produtos...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.75 7.5h16.5M10 11.25v-6m4 6v-6" />
                    </svg>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Nenhum produto ainda
                    </h3>
                    <p className="text-sm text-gray-500">
                        Comece adicionando seus produtos para começar a vender!
                    </p>
                </div>
            </div>
        );
    }

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


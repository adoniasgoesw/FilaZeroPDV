import { useState } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';

// Dados fictícios
const mockComplementos = [
    { id: 1, name: 'Batata Palha', purchasePrice: 'R$ 8,50', salePrice: 'R$ 12,00', active: true },
    { id: 2, name: 'Bacon Extra', purchasePrice: 'R$ 5,00', salePrice: 'R$ 8,00', active: true },
    { id: 3, name: 'Queijo Cheddar', purchasePrice: 'R$ 4,50', salePrice: 'R$ 7,00', active: true },
    { id: 4, name: 'Ovo', purchasePrice: 'R$ 0,50', salePrice: 'R$ 2,00', active: false },
    { id: 5, name: 'Cebola Roxa', purchasePrice: 'R$ 2,00', salePrice: 'R$ 4,00', active: true },
    { id: 6, name: 'Tomate', purchasePrice: 'R$ 1,50', salePrice: 'R$ 3,00', active: true },
    { id: 7, name: 'Alface', purchasePrice: 'R$ 1,00', salePrice: 'R$ 2,50', active: true },
    { id: 8, name: 'Molho Especial', purchasePrice: 'R$ 3,00', salePrice: 'R$ 5,00', active: false },
];

export default function ListComplementos() {
    const [complementos, setComplementos] = useState(mockComplementos);
    const [selected, setSelected] = useState(new Set());

    const headers = ['Complemento', 'Valor de Compra', 'Valor de Venda', 'Status', 'Ações'];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(new Set(complementos.map(c => c.id)));
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
        setComplementos(complementos.map(complemento => 
            complemento.id === id ? { ...complemento, active: !complemento.active } : complemento
        ));
    };

    const handleEdit = (id) => {
        console.log('Editar complemento:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este complemento?')) {
            setComplementos(complementos.filter(complemento => complemento.id !== id));
        }
    };

    const handleBulkToggleStatus = () => {
        const selectedIds = Array.from(selected);
        setComplementos(complementos.map(complemento => 
            selectedIds.includes(complemento.id)
                ? { ...complemento, active: !complemento.active } 
                : complemento
        ));
    };

    const handleBulkEdit = () => {
        console.log('Editar selecionados:', Array.from(selected));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} complemento(s)?`)) {
            setComplementos(complementos.filter(complemento => !selected.has(complemento.id)));
            setSelected(new Set());
        }
    };

    const renderCheckbox = (complemento) => (
        <input
            type="checkbox"
            checked={selected.has(complemento.id)}
            onChange={() => handleSelect(complemento.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );

    const renderRow = (complemento) => (
        <span className="text-xs font-medium text-gray-900">{complemento.name}</span>
    );

    const renderAdditionalColumns = (complemento) => (
        <>
            <div className="text-xs text-gray-600">{complemento.purchasePrice}</div>
            <div className="text-xs text-gray-600">{complemento.salePrice}</div>
            <div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                    complemento.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                }`}>
                    {complemento.active ? 'Ativo' : 'Inativo'}
                </span>
            </div>
        </>
    );

    const actions = (complemento) => (
        <>
            <StatusButton 
                isActive={complemento.active} 
                onClick={() => handleStatusToggle(complemento.id)} 
            />
            <EditButton onClick={() => handleEdit(complemento.id)} />
            <DeleteButton onClick={() => handleDelete(complemento.id)} />
        </>
    );

    const renderActionsButton = () => (
        <ActionsButton
            onToggleStatus={handleBulkToggleStatus}
            onEdit={handleBulkEdit}
            onDelete={handleBulkDelete}
        />
    );

    return (
        <div className="h-full">
            <ListBase 
                headers={headers}
                data={complementos}
                renderRow={renderRow}
                renderAdditionalColumns={renderAdditionalColumns}
                actions={actions}
                selectedCount={selected.size}
                totalCount={complementos.length}
                onSelectAll={handleSelectAll}
                renderCheckbox={renderCheckbox}
                renderActionsButton={renderActionsButton}
                columns={5}
            />
        </div>
    );
}


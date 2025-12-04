import { useState } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';

// Dados fictícios
const mockPayments = [
    { id: 1, name: 'Dinheiro', type: 'Dinheiro', account: 'Caixa Principal', fee: '0%', active: true },
    { id: 2, name: 'Cartão Débito', type: 'Cartão', account: 'Banco do Brasil', fee: '1.5%', active: true },
    { id: 3, name: 'Cartão Crédito', type: 'Cartão', account: 'Banco do Brasil', fee: '3.0%', active: true },
    { id: 4, name: 'PIX', type: 'Digital', account: 'Conta Digital', fee: '0%', active: true },
    { id: 5, name: 'Vale Alimentação', type: 'Vale', account: 'Benefícios', fee: '2.0%', active: false },
    { id: 6, name: 'Vale Refeição', type: 'Vale', account: 'Benefícios', fee: '2.0%', active: true },
    { id: 7, name: 'Transferência', type: 'Digital', account: 'Banco do Brasil', fee: '0%', active: true },
];

export default function ListPayments() {
    const [payments, setPayments] = useState(mockPayments);
    const [selected, setSelected] = useState(new Set());

    const headers = ['Pagamento', 'Tipo de Pagamento', 'Conta Bancária', 'Taxa', 'Ações'];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(new Set(payments.map(p => p.id)));
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
        setPayments(payments.map(payment => 
            payment.id === id ? { ...payment, active: !payment.active } : payment
        ));
    };

    const handleEdit = (id) => {
        console.log('Editar forma de pagamento:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta forma de pagamento?')) {
            setPayments(payments.filter(payment => payment.id !== id));
        }
    };

    const handleBulkToggleStatus = () => {
        const selectedIds = Array.from(selected);
        setPayments(payments.map(payment => 
            selectedIds.includes(payment.id)
                ? { ...payment, active: !payment.active } 
                : payment
        ));
    };

    const handleBulkEdit = () => {
        console.log('Editar selecionados:', Array.from(selected));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} forma(s) de pagamento?`)) {
            setPayments(payments.filter(payment => !selected.has(payment.id)));
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

    const renderCheckbox = (payment) => (
        <input
            type="checkbox"
            checked={selected.has(payment.id)}
            onChange={() => handleSelect(payment.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );

    const renderRow = (payment) => (
        <span className="text-xs font-medium text-gray-900">{payment.name}</span>
    );

    const renderAdditionalColumns = (payment) => (
        <>
            <div className="text-xs text-gray-600">{payment.type}</div>
            <div className="text-xs text-gray-600">{payment.account}</div>
            <div className="text-xs text-gray-600">{payment.fee}</div>
        </>
    );

    const actions = (payment) => (
        <>
            <StatusButton 
                isActive={payment.active} 
                onClick={() => handleStatusToggle(payment.id)} 
            />
            <EditButton onClick={() => handleEdit(payment.id)} />
            <DeleteButton onClick={() => handleDelete(payment.id)} />
        </>
    );

    return (
        <div className="h-full">
            <ListBase 
                headers={headers}
                data={payments}
                renderRow={renderRow}
                renderAdditionalColumns={renderAdditionalColumns}
                actions={actions}
                selectedCount={selected.size}
                totalCount={payments.length}
                onSelectAll={handleSelectAll}
                renderCheckbox={renderCheckbox}
                renderActionsButton={renderActionsButton}
            />
        </div>
    );
}


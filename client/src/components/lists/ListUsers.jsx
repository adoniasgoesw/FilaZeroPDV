import { useState } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';

// Dados fictícios
const mockUsers = [
    { id: 1, name: 'Admin Sistema', cpf: '000.000.000-00', email: 'admin@filazero.com', role: 'Administrador', active: true },
    { id: 2, name: 'Gerente Loja', cpf: '111.111.111-11', email: 'gerente@filazero.com', role: 'Gerente', active: true },
    { id: 3, name: 'Atendente 1', cpf: '222.222.222-22', email: 'atendente1@filazero.com', role: 'Atendente', active: true },
    { id: 4, name: 'Atendente 2', cpf: '333.333.333-33', email: 'atendente2@filazero.com', role: 'Atendente', active: false },
    { id: 5, name: 'Caixa 1', cpf: '444.444.444-44', email: 'caixa1@filazero.com', role: 'Caixa', active: true },
    { id: 6, name: 'Caixa 2', cpf: '555.555.555-55', email: 'caixa2@filazero.com', role: 'Caixa', active: true },
    { id: 7, name: 'Cozinheiro', cpf: '666.666.666-66', email: 'cozinheiro@filazero.com', role: 'Cozinheiro', active: true },
    { id: 8, name: 'Entregador', cpf: '777.777.777-77', email: 'entregador@filazero.com', role: 'Entregador', active: false },
];

export default function ListUsers() {
    const [users, setUsers] = useState(mockUsers);
    const [selected, setSelected] = useState(new Set());

    const headers = ['Usuário', 'CPF', 'Email', 'Cargo', 'Ações'];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(new Set(users.map(u => u.id)));
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
        setUsers(users.map(user => 
            user.id === id ? { ...user, active: !user.active } : user
        ));
    };

    const handleEdit = (id) => {
        console.log('Editar usuário:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleBulkToggleStatus = () => {
        const selectedIds = Array.from(selected);
        setUsers(users.map(user => 
            selectedIds.includes(user.id)
                ? { ...user, active: !user.active } 
                : user
        ));
    };

    const handleBulkEdit = () => {
        console.log('Editar selecionados:', Array.from(selected));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} usuário(s)?`)) {
            setUsers(users.filter(user => !selected.has(user.id)));
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

    const renderCheckbox = (user) => (
        <input
            type="checkbox"
            checked={selected.has(user.id)}
            onChange={() => handleSelect(user.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );

    const renderRow = (user) => (
        <span className="text-xs font-medium text-gray-900">{user.name}</span>
    );

    const renderAdditionalColumns = (user) => (
        <>
            <div className="text-xs text-gray-600">{user.cpf}</div>
            <div className="text-xs text-gray-600">{user.email}</div>
            <div className="text-xs text-gray-600">{user.role}</div>
        </>
    );

    const actions = (user) => (
        <>
            <StatusButton 
                isActive={user.active} 
                onClick={() => handleStatusToggle(user.id)} 
            />
            <EditButton onClick={() => handleEdit(user.id)} />
            <DeleteButton onClick={() => handleDelete(user.id)} />
        </>
    );

    return (
        <div className="h-full">
            <ListBase 
                headers={headers}
                data={users}
                renderRow={renderRow}
                renderAdditionalColumns={renderAdditionalColumns}
                actions={actions}
                selectedCount={selected.size}
                totalCount={users.length}
                onSelectAll={handleSelectAll}
                renderCheckbox={renderCheckbox}
                renderActionsButton={renderActionsButton}
            />
        </div>
    );
}


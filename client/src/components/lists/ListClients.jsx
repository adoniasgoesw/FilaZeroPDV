import { useState } from 'react';
import ListBase from './ListBase.jsx';
import StatusButton from '../buttons/StatusButton.jsx';
import EditButton from '../buttons/EditButton.jsx';
import DeleteButton from '../buttons/DeleteButton.jsx';
import ActionsButton from '../buttons/ActionsButton.jsx';

// Dados fictícios
const mockClients = [
    { id: 1, name: 'João Silva', cpf: '123.456.789-00', email: 'joao@email.com', address: 'Rua A, 123', active: true },
    { id: 2, name: 'Maria Santos', cpf: '987.654.321-00', email: 'maria@email.com', address: 'Av. B, 456', active: true },
    { id: 3, name: 'Pedro Oliveira', cpf: '111.222.333-44', email: 'pedro@email.com', address: 'Rua C, 789', active: false },
    { id: 4, name: 'Ana Costa', cpf: '555.666.777-88', email: 'ana@email.com', address: 'Av. D, 321', active: true },
    { id: 5, name: 'Carlos Souza', cpf: '999.888.777-66', email: 'carlos@email.com', address: 'Rua E, 654', active: true },
    { id: 6, name: 'Julia Ferreira', cpf: '444.333.222-11', email: 'julia@email.com', address: 'Av. F, 987', active: false },
    { id: 7, name: 'Roberto Lima', cpf: '777.888.999-00', email: 'roberto@email.com', address: 'Rua G, 147', active: true },
    { id: 8, name: 'Fernanda Alves', cpf: '222.333.444-55', email: 'fernanda@email.com', address: 'Av. H, 258', active: true },
    { id: 9, name: 'Lucas Martins', cpf: '666.777.888-99', email: 'lucas@email.com', address: 'Rua I, 369', active: false },
    { id: 10, name: 'Patricia Rocha', cpf: '333.444.555-66', email: 'patricia@email.com', address: 'Av. J, 741', active: true },
];

export default function ListClients() {
    const [clients, setClients] = useState(mockClients);
    const [selected, setSelected] = useState(new Set());

    const headers = ['Cliente', 'CPF', 'Email', 'Endereço', 'Ações'];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(new Set(clients.map(c => c.id)));
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
        setClients(clients.map(client => 
            client.id === id ? { ...client, active: !client.active } : client
        ));
    };

    const handleEdit = (id) => {
        console.log('Editar cliente:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    const handleBulkToggleStatus = () => {
        const selectedIds = Array.from(selected);
        setClients(clients.map(client => 
            selectedIds.includes(client.id)
                ? { ...client, active: !client.active } 
                : client
        ));
    };

    const handleBulkEdit = () => {
        console.log('Editar selecionados:', Array.from(selected));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selected.size} cliente(s)?`)) {
            setClients(clients.filter(client => !selected.has(client.id)));
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

    const renderCheckbox = (client) => (
        <input
            type="checkbox"
            checked={selected.has(client.id)}
            onChange={() => handleSelect(client.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
    );

    const renderRow = (client) => (
        <span className="text-xs font-medium text-gray-900">{client.name}</span>
    );

    const renderAdditionalColumns = (client) => (
        <>
            <div className="text-xs text-gray-600">{client.cpf}</div>
            <div className="text-xs text-gray-600">{client.email}</div>
            <div className="text-xs text-gray-600">{client.address}</div>
        </>
    );

    const actions = (client) => (
        <>
            <StatusButton 
                isActive={client.active} 
                onClick={() => handleStatusToggle(client.id)} 
            />
            <EditButton onClick={() => handleEdit(client.id)} />
            <DeleteButton onClick={() => handleDelete(client.id)} />
        </>
    );

    return (
        <div className="h-full">
            <ListBase 
                headers={headers}
                data={clients}
                renderRow={renderRow}
                renderAdditionalColumns={renderAdditionalColumns}
                actions={actions}
                selectedCount={selected.size}
                totalCount={clients.length}
                onSelectAll={handleSelectAll}
                renderCheckbox={renderCheckbox}
                renderActionsButton={renderActionsButton}
            />
        </div>
    );
}


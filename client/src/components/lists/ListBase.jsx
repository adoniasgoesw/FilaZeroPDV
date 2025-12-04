export default function ListBase({ headers, data, renderRow, actions, selectedCount, totalCount, onSelectAll, renderCheckbox, renderAdditionalColumns, renderActionsButton, columns = 5 }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
            {/* Área de Checkbox */}
            {selectedCount !== undefined && (
                <div className="bg-gray-50 px-6 py-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedCount === totalCount && totalCount > 0}
                                onChange={onSelectAll}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">
                                {selectedCount} de {totalCount} selecionados
                            </span>
                        </div>
                        {selectedCount > 0 && renderActionsButton && renderActionsButton()}
                    </div>
                </div>
            )}

            {/* Cabeçalho fixo - Mobile: 1 coluna, Tablet: 4 colunas, Desktop: dinâmico */}
            <div className={`bg-gray-50 px-6 py-3 flex-shrink-0 ${selectedCount === undefined ? 'rounded-t-xl' : ''}`}>
                <div className={`hidden md:grid ${columns === 4 ? 'lg:grid-cols-4 md:grid-cols-4' : 'lg:grid-cols-5 md:grid-cols-4'} gap-4`}>
                    {headers.map((header, index) => (
                        <div key={index} className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            {header}
                        </div>
                    ))}
                </div>
                {/* Mobile: apenas primeira coluna */}
                <div className="md:hidden">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {headers[0]}
                    </div>
                </div>
            </div>

            {/* Corpo da tabela com scroll */}
            <div className="flex-1 overflow-y-auto">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center h-full py-12">
                        <p className="text-gray-400 text-xs">Nenhum registro encontrado</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {data.map((item, index) => (
                            <div key={index} className="px-6 py-3 hover:bg-gray-50 transition-colors">
                                {/* Desktop: dinâmico, Tablet: 4 colunas */}
                                <div className={`hidden md:grid ${columns === 4 ? 'lg:grid-cols-4 md:grid-cols-4' : 'lg:grid-cols-5 md:grid-cols-4'} gap-4 items-center`}>
                                    <div className="flex items-center gap-3">
                                        {renderCheckbox && renderCheckbox(item, index)}
                                        {renderRow(item)}
                                    </div>
                                    {renderAdditionalColumns && renderAdditionalColumns(item)}
                                    <div className="flex items-center gap-2">
                                        {actions && actions(item, index)}
                                    </div>
                                </div>
                                {/* Mobile: apenas 1 coluna */}
                                <div className="md:hidden flex items-center gap-3">
                                    {renderCheckbox && renderCheckbox(item, index)}
                                    {renderRow(item)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


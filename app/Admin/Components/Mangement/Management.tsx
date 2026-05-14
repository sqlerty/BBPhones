import { useAdminActions, useData, useEntity } from '@/app/stores/adminStore';
import { useEffect } from 'react';
import { managementData } from './managementData';
import { useModalActions } from '@/app/stores/modalStore';
export default function Management() {
    const { fetchData, deleteItem, setEntity } = useAdminActions();
    const entity = useEntity();
    const { openAdminModal } = useModalActions();
    const data = useData();
    useEffect(() => {
        if (entity) fetchData(entity);
    }, [entity, fetchData]);

    const hasData = data && data.length > 0;
    if (!hasData) {
        return (
            <div className="p-5 text-gray-500">
                Нет данных для отображения...
            </div>
        );
    }
    const columns =
        data.length > 0
            ? Object.keys(data[0]).filter((key) => key !== 'password')
            : [];
    return (
        <div className="space-y-10">
            <div className="pt-10">
                <div className="flex gap-5 max-md:flex-wrap max-md:justify-between">
                    {managementData.map((item) => (
                        <button
                            className={`${item.entity === entity ? 'bg-blue-600' : 'bg-black'} group flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-3 font-medium text-white shadow-xl shadow-gray-900/10 transition-colors duration-300 ease-in-out hover:bg-blue-600`}
                            key={item.name}
                            onClick={() => setEntity(item.entity)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            {entity && (
                <button
                    onClick={() => openAdminModal('Admin')}
                    className="cursor-pointer rounded-2xl bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700"
                >
                    + Добавить
                </button>
            )}

            <div className="overflow-x-scroll rounded-lg bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className="px-6 py-3 text-center font-bold"
                                >
                                    {col}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {data.map((item, index) => (
                            <tr
                                key={String(item.id || index)}
                                className="hover:bg-gray-50"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col}
                                        className="px-6 py-4 text-center"
                                    >
                                        {renderValue(
                                            (item as Record<string, unknown>)[
                                                col
                                            ]
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            onClick={() =>
                                                openAdminModal('Admin', item)
                                            }
                                            className="rounded-xl p-2 hover:bg-gray-100"
                                        >
                                            Ред.
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteItem(String(item.id))
                                            }
                                            className="rounded-xl p-2 hover:bg-rose-100"
                                        >
                                            Уд.
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function renderValue(val: unknown): React.ReactNode {
    if (val === null || val === undefined)
        return <span className="text-gray-300">—</span>;
    if (typeof val === 'object') {
        if (Array.isArray(val)) return `(${val})`;
        return (
            <pre className="max-h-24 overflow-y-auto rounded border border-purple-100 bg-purple-50 p-1 font-mono text-xs text-purple-700">
                {JSON.stringify(val, null, 2)}
            </pre>
        );
    }
    if (
        typeof val === 'string' &&
        val.includes('T') &&
        !isNaN(Date.parse(val)) &&
        val.length > 15
    ) {
        return <span>{new Date(val).toLocaleString('ru-RU')}</span>;
    }
    return String(val);
}

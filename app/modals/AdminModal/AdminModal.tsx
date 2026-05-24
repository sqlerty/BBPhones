'use client';
import { useState } from 'react';
import { useAdminActions, useEntity } from '@/app/stores/adminStore';
import { useModalActions, useEditItem } from '@/app/stores/modalStore';
import { IoMdClose } from 'react-icons/io';
import { z } from 'zod';
import {
    phoneSchema,
    userSchema,
    brandSchema,
    orderSchema,
    reviewSchema,
} from '@/lib/validation';
export default function AdminModal() {
    const currentEntity = useEntity();
    const editItem = useEditItem();
    const { updateItem, createItem } = useAdminActions();
    const { closeModal } = useModalActions();
    const [formData, setFormData] = useState<Record<string, unknown>>(
        (editItem as Record<string, unknown>) || {}
    );

    const handleChange = (key: string, value: string) => {
        let parsedValue: unknown = value;
        if (
            ['price', 'stock', 'ram', 'storage', 'rating'].includes(key) &&
            value !== ''
        ) {
            parsedValue = Number(value);
        }

        setFormData((prev) => ({ ...prev, [key]: parsedValue }));
    };

    const handleSave = async () => {
        const payload = { ...formData };

        if (payload.specs && typeof payload.specs === 'string') {
            try {
                payload.specs = JSON.parse(payload.specs);
            } catch {
                return alert('Ошибка в формате JSON (Характеристики)');
            }
        }
        if (payload.images && typeof payload.images === 'string') {
            payload.images = payload.images.split(',').map((s) => s.trim());
        }
        try {
            if (currentEntity === 'phones') phoneSchema.parse(payload);
            if (currentEntity === 'users') userSchema.parse(payload);
            if (currentEntity === 'brands') brandSchema.parse(payload);
            if (currentEntity === 'orders') orderSchema.parse(payload);
            if (currentEntity === 'reviews') reviewSchema.parse(payload);
        } catch (err) {
            if (err instanceof z.ZodError) {
                alert(err.issues[0].message);
            } else {
                alert('Произошла непредвиденная ошибка');
            }
        }

        const success = (editItem as { id?: string })?.id
            ? await updateItem((editItem as { id: string }).id, payload)
            : await createItem(payload);

        if (success) closeModal();
    };

    const getFields = (): string[] => {
        switch (currentEntity) {
            case 'phones':
                return [
                    'name',
                    'slug',
                    'price',
                    'stock',
                    'ram',
                    'storage',
                    'color',
                    'images',
                    'specs',
                    'brandId',
                    'description',
                ];
            case 'brands':
                return ['name', 'slug'];

            case 'reviews':
                return ['rating', 'comment'];
            default:
                return ['name', 'email', 'role'];
        }
    };

    return (
        <div
            key={(editItem as { id?: string })?.id || 'new-entry'}
            className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-4xl bg-white p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {editItem ? 'Редактировать' : 'Добавить'}{' '}
                        {currentEntity}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    {getFields().map((field) => (
                        <div key={field} className="flex flex-col gap-1">
                            <label className="ml-1 text-xs font-bold text-gray-400 uppercase">
                                {field}
                            </label>

                            <input
                                type={
                                    field === 'price' ||
                                    field === 'stock' ||
                                    field === 'ram' ||
                                    field === 'storage'
                                        ? 'number'
                                        : 'text'
                                }
                                className="w-full rounded-xl border bg-gray-50 p-3 text-sm transition-all outline-none focus:ring-2 focus:ring-purple-200"
                                value={formatInputValue(formData[field])}
                                onChange={(e) =>
                                    handleChange(field, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSave}
                    className="mt-8 w-full rounded-2xl bg-black py-4 font-bold text-white transition-all hover:bg-gray-800"
                >
                    Сохранить изменения
                </button>
            </div>
        </div>
    );
}

function formatInputValue(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
        if (Array.isArray(value)) return value.join(', ');
        return JSON.stringify(value);
    }

    return String(value);
}

import { z } from 'zod';

export const phoneSchema = z.object({
    name: z.string().min(2, 'Название должно быть длиннее 2 символов'),
    slug: z.string().min(2, 'Slug обязателен'),
    price: z.number().min(0, 'Цена не может быть отрицательной'),
    stock: z.number().int().min(0, 'Остаток не может быть отрицательным'),
    ram: z.number().optional().nullable(),
    storage: z.number().optional().nullable(),
    color: z.string().optional().nullable(),
    brandId: z.string().min(1, 'Бренд обязателен'),
});

export const userSchema = z.object({
    email: z.email('Некорректный email'),
    name: z.string().min(2, 'Имя слишком короткое'),
    role: z.enum(['USER', 'ADMIN']),
});

export const brandSchema = z.object({
    name: z.string().min(2, 'Название слишком короткое'),
    slug: z.string().min(2, 'Slug обязателен'),
});

export const orderSchema = z.object({
    userId: z.string().min(1, 'ID пользователя обязателен'),
    total: z.number().min(0, 'Сумма не может быть отрицательной'),
    status: z.string().min(1, 'Статус обязателен'),
});

import { productSchema, userSchema } from '@/lib/validation';

describe('Unit тесты: Валидация данных (Zod)', () => {
    it('1. productSchema должна пропускать корректные данные товара', () => {
        const validProduct = {
            name: 'iPhone 15',
            slug: 'iphone-15',
            price: 80000,
            stock: 10,
            categoryId: '123-uuid',
        };

        const result = productSchema.safeParse(validProduct);
        expect(result.success).toBe(true);
    });

    it('2. productSchema должна выдавать ошибку, если цена отрицательная', () => {
        const invalidProduct = {
            name: 'Bad Phone',
            slug: 'bad-phone',
            price: -500,
            stock: 10,
            categoryId: '123-uuid',
        };

        const result = productSchema.safeParse(invalidProduct);
        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.issues[0].message).toBe(
                'Цена не может быть отрицательной'
            );
        }
    });

    it('3. userSchema должна отклонять некорректный формат email', () => {
        const invalidUser = {
            email: 'not-an-email', // Некорректный email
            name: 'Ivan',
            role: 'USER',
        };

        const result = userSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Некорректный email');
        }
    });
});

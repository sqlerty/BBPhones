import { render, screen } from '@testing-library/react';
import BBPluses from '@/app/Phone/[id]/Components/PhoneDetail/BBPluses/BBPluses';
import VoidCart from '@/app/Cart/Components/VoidCart';

describe('Unit тесты: UI Компоненты', () => {
    it('4. Компонент BBPluses должен отображать все 3 преимущества', () => {
        render(<BBPluses />);

        expect(screen.getByText('Гарантия 1 год')).toBeInTheDocument();
        expect(screen.getByText('Доставка завтра')).toBeInTheDocument();
        expect(screen.getByText('Возврат 14 дней')).toBeInTheDocument();
    });

    it('5. Компонент VoidCart должен отображать сообщение о пустой корзине и ссылку в каталог', () => {
        render(<VoidCart />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Корзина пуста');

        const link = screen.getByRole('link', { name: /Перейти в каталог/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});

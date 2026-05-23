import { useAdminStore } from '@/app/stores/adminStore';
import axios from 'axios';
import { Brands } from '@prisma/client';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Unit тесты 6-13: Zustand adminStore и API запросы', () => {
    beforeEach(() => {
        useAdminStore.setState({
            data: [],
            isLoadingManage: false,
            currentEntity: '',
            adminTab: '',
        });
        jest.clearAllMocks();
    });

    it('6. setAdminTab должен изменять текущую вкладку', () => {
        useAdminStore.getState().setAdminTab('Analytics');
        expect(useAdminStore.getState().adminTab).toBe('Analytics');
    });

    it('7. setEntity должен изменять текущую сущность', () => {
        useAdminStore.getState().setEntity('phones');
        expect(useAdminStore.getState().currentEntity).toBe('phones');
    });

    it('8. fetchData должен успешно загружать данные', async () => {
        const mockData = [{ id: '1', name: 'Phone 1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        await useAdminStore.getState().fetchData('phones');

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/admin/phones');
        expect(useAdminStore.getState().data).toEqual(mockData);
        expect(useAdminStore.getState().isLoadingManage).toBe(false);
    });

    it('9. fetchData должен обрабатывать ошибку сервера', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        await useAdminStore.getState().fetchData('phones');

        expect(useAdminStore.getState().data).toEqual([]);
        expect(useAdminStore.getState().isLoadingManage).toBe(false);
    });

    it('10. createItem должен отправлять POST запрос и обновлять данные', async () => {
        useAdminStore.setState({ currentEntity: 'phones' });
        mockedAxios.post.mockResolvedValueOnce({ data: { id: '2' } });
        mockedAxios.get.mockResolvedValueOnce({ data: [{ id: '2' }] }); // Мок для fetchData внутри create

        const success = await useAdminStore
            .getState()
            .createItem({ name: 'New Phone' });

        expect(success).toBe(true);
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/admin/phones', {
            name: 'New Phone',
        });
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/admin/phones');
    });

    it('11. createItem должен возвращать false при ошибке', async () => {
        useAdminStore.setState({ currentEntity: 'phones' });
        mockedAxios.post.mockRejectedValueOnce(new Error('Error'));

        window.alert = jest.fn();
        const success = await useAdminStore
            .getState()
            .createItem({ name: 'Error Phone' });

        expect(success).toBe(false);
        expect(useAdminStore.getState().isLoadingManage).toBe(false);
    });

    it('12. updateItem должен отправлять PUT запрос', async () => {
        useAdminStore.setState({ currentEntity: 'brands' });
        mockedAxios.put.mockResolvedValueOnce({
            data: { id: '1', name: 'Apple' },
        });
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        const success = await useAdminStore
            .getState()
            .updateItem('1', { name: 'Apple' });

        expect(success).toBe(true);
        expect(mockedAxios.put).toHaveBeenCalledWith('/api/admin/brands', {
            id: '1',
            name: 'Apple',
        });
    });

    it('13. deleteItem должен фильтровать массив после удаления', async () => {
        window.confirm = jest.fn(() => true);
        mockedAxios.delete.mockResolvedValueOnce({});

        const mockBrand1: Brands = {
            id: '1',
            name: 'Apple',
            slug: 'apple',
            createdAt: new Date(),
        };
        const mockBrand2: Brands = {
            id: '2',
            name: 'Samsung',
            slug: 'samsung',
            createdAt: new Date(),
        };

        useAdminStore.setState({
            currentEntity: 'brands',
            data: [mockBrand1, mockBrand2],
        });

        await useAdminStore.getState().deleteItem('1');

        expect(mockedAxios.delete).toHaveBeenCalledWith(
            '/api/admin/brands?id=1'
        );
        expect(useAdminStore.getState().data).toEqual([mockBrand2]);
    });
});

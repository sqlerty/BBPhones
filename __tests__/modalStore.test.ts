import { useModalStore } from '@/app/stores/modalStore';

describe('Unit тесты 14-17: Zustand modalStore', () => {
    beforeEach(() => {
        useModalStore.setState({ activeModal: null, editItem: null });
    });

    it('14. openModal должен устанавливать activeModal', () => {
        useModalStore.getState().openModal('Settings');
        expect(useModalStore.getState().activeModal).toBe('Settings');
    });

    it('15. closeModal должен сбрасывать activeModal', () => {
        useModalStore.setState({ activeModal: 'Cart' });
        useModalStore.getState().closeModal();
        expect(useModalStore.getState().activeModal).toBeNull();
    });

    it('16. openAdminModal должен устанавливать модалку и данные редактирования', () => {
        const item = { id: '123', name: 'Test' };
        useModalStore.getState().openAdminModal('AdminForm', item);

        expect(useModalStore.getState().activeModal).toBe('AdminForm');
        expect(useModalStore.getState().editItem).toEqual(item);
    });

    it('17. closeAdminModal должен полностью очищать стейт модалки', () => {
        useModalStore.setState({
            activeModal: 'AdminForm',
            editItem: { id: '1' },
        });
        useModalStore.getState().closeAdminModal();

        expect(useModalStore.getState().activeModal).toBeNull();
        expect(useModalStore.getState().editItem).toBeNull();
    });
});

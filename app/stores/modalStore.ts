import { create, StateCreator } from 'zustand';

interface IModal {
    activeModal: string | null;
    openModal: (name: string) => void;
    closeModal: () => void;
    editItem: unknown | null;
    openAdminModal: (name: string, item?: unknown) => void;
    closeAdminModal: () => void;
}

const modalStore: StateCreator<IModal> = (set) => ({
    activeModal: null,
    editItem: null,
    openModal: (name) => set({ activeModal: name }),
    closeModal: () => set({ activeModal: null }),
    openAdminModal: (name, item) => {
        set({ activeModal: name, editItem: item });
    },
    closeAdminModal: () => {
        set({ activeModal: null, editItem: null });
    },
});

export const useModalStore = create<IModal>()(modalStore);

export const useActiveModal = () => useModalStore((state) => state.activeModal);
export const useEditItem = () => useModalStore((state) => state.editItem);
export const useModalActions = () => {
    const { openModal, closeModal, openAdminModal, closeAdminModal } =
        useModalStore.getState();
    return { openModal, closeModal, openAdminModal, closeAdminModal };
};

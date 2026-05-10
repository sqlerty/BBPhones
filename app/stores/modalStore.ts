import { create, StateCreator } from 'zustand';

interface IModal {
    activeModal: string | null;
    openModal: (name: string) => void;
    closeModal: () => void;
}

const modalStore: StateCreator<IModal> = (set) => ({
    activeModal: null,
    openModal: (name) => set({ activeModal: name }),
    closeModal: () => set({ activeModal: null }),
});

const useModalStore = create<IModal>()(modalStore);

export const useActiveModal = () => useModalStore((state) => state.activeModal);

export const useModalActions = () => {
    const { openModal, closeModal } = useModalStore.getState();
    return { openModal, closeModal };
};

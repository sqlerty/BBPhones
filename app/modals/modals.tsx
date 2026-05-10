'use client';
import ProfileModal from './ProfileModal/ProfileModal';
import { useActiveModal } from '../stores/modalStore';

export default function Modals() {
    const activeModal = useActiveModal();
    return <>{activeModal == 'Settings' && <ProfileModal />}</>;
}

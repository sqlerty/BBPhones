import { IoCartOutline } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { LuShield } from 'react-icons/lu';

export const navLinks = [
    { to: '/', icon: FiHome, label: 'Главная', requariesAuth: false },
    { to: '/Cart', icon: IoCartOutline, label: 'Корзина', requariesAuth: true },
    {
        to: '/Profile',
        icon: MdOutlinePersonOutline,
        label: 'Профиль',
        requariesAuth: true,
    },
    {
        to: '/Admin',
        icon: LuShield,
        label: 'Админ-Панель',
        requariesAuth: true,
        adminOnly: true,
    },
];

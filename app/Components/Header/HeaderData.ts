import {  IoCartOutline } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';
import { MdOutlinePersonOutline } from 'react-icons/md';
export const navLinks = [
    { to: "/", icon: FiHome, label: "Главная" },
    { to: "/Cart", icon: IoCartOutline, label: "Корзина"},
    { to: "/Profile", icon: MdOutlinePersonOutline, label: "Профиль" ,dopTo: "/Authorization"},
];

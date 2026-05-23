import { LuShield, LuCreditCard, LuPhone, LuMail } from 'react-icons/lu';
import { BsShop } from 'react-icons/bs';
import { FiHelpCircle } from 'react-icons/fi';
import { MdOutlineWatchLater } from 'react-icons/md';
export const faqData = [
    {
        icon: LuShield,
        id: 1,
        question: 'Оригинальная ли у вас продукция?',
        answer: 'Да, мы продаем только 100% оригинальную, сертифицированную продукцию в закрытой заводской упаковке. Перед покупкой вы можете проверить серийные номера на официальном сайте производителя.',
    },
    {
        icon: BsShop,
        id: 2,
        question: 'Есть ли гарантия на смартфоны?',
        answer: 'Абсолютно! На все наши смартфоны предоставляется официальная гарантия 1 год от производителя. Также вы можете приобрести расширенную гарантию от магазина.',
    },
    {
        icon: FiHelpCircle,
        id: 3,
        question: 'Могу ли я вернуть товар?',
        answer: 'Да, вы можете вернуть или обменять товар надлежащего качества в течение 14 дней с момента покупки, если сохранен товарный вид, заводские пленки, пломбы и полная комплектация.',
    },
    {
        icon: LuCreditCard,
        id: 4,
        question: 'Какие способы оплаты вы принимаете?',
        answer: 'Мы принимаем наличные при получении, банковские карты МИР онлайн, а также работаем с СБП.',
    },
];

export const contactData = [
    {
        icon: LuPhone,
        title: 'Телефон',
        value: '8 (800) 555-35-35',
        description: 'Бесплатно по всей России',
    },
    {
        icon: LuMail,
        title: 'Email',
        value: 'info@bbphones.ru',
        description: 'Ответ в течение часа',
    },
    {
        icon: MdOutlineWatchLater,
        title: 'Email',
        value: 'Ежедневно, 09:00 – 21:00',
        description: 'Без перерывов и выходных',
    },
];

import Banner from './Banner/Banner';
import Quastions from './FAQ/Quastions';
import Contacts from './Contacts/Contacts';
export default function Information() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                    О магазине
                </h1>
                <p className="mx-auto max-w-2xl text-xl text-gray-500">
                    Узнайте больше о нашей миссии, найдите ответы на частые
                    вопросы или заходите к нам в гости.
                </p>
            </div>

            <Banner />
            <Quastions />
            <Contacts />
        </div>
    );
}

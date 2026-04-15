import Contacts from './Contacts/Contacts';
import MainInfo from './MainInfo/MainInfo';

export default function Profile() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 p-5 pt-15">
                <h1 className="text-3xl font-extrabold">Личный кабинет</h1>
                <div className="flex flex-col gap-10">
                    <MainInfo />
                    <Contacts />
                </div>
            </div>
        </div>
    );
}

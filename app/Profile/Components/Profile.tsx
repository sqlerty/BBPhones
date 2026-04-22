import Contacts from './Contacts/Contacts';
import MainInfo from './MainInfo/MainInfo';
import UserContent from './UserContent/Main';

export default function Profile() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl p-5 pt-15">
                <h1 className="mb-10 text-3xl font-extrabold">
                    Личный кабинет
                </h1>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-10">
                        <MainInfo />
                        <Contacts />
                    </div>
                    <UserContent />
                </div>
            </div>
        </div>
    );
}

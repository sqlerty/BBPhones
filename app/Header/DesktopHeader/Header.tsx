import { IoPhonePortraitOutline } from 'react-icons/io5';
import Link from 'next/link';
import DesktopNav from './DesktopNav';

export default function Header() {
    return (
        <div className="h-20 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-all ease-in-out group-hover:scale-105">
                        <IoPhonePortraitOutline className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">
                        BB
                        <span className="text-blue-600">Phones</span>
                    </h2>
                </Link>
                <DesktopNav />
            </div>
        </div>
    );
}

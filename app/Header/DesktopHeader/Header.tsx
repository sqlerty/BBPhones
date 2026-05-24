import Link from 'next/link';
import DesktopNav from './DesktopNav';
import Image from 'next/image';
export default function Header() {
    return (
        <div className="h-20 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="transition-all ease-in-out group-hover:scale-105">
                        <Image
                            src="/img/logo.svg"
                            alt="logo"
                            width={500}
                            height={300}
                            className="h-10 w-10"
                        />
                    </div>

                    <h2 className="text-xl font-bold transition-all ease-in-out group-hover:scale-105">
                        BB
                        <span className="text-blue-600">Phones</span>
                    </h2>
                </Link>
                <DesktopNav />
            </div>
        </div>
    );
}

'use client';
import Filters from './Filters/Filters';
import Phones from './Phones/Phones';
import SortBar from './SortBar/SortBar';
import TitleBar from './TitleBar/TitleBar';
import { useIsFilter } from '@/app/stores/catalogStore';
export default function Catalog() {
    const isFilter = useIsFilter();
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl">
                <TitleBar />
                <SortBar />
                <div className="flex gap-10">
                    {isFilter && (
                        <div className="p-5">
                            <Filters />
                        </div>
                    )}
                    <Phones />
                </div>
            </div>
        </div>
    );
}

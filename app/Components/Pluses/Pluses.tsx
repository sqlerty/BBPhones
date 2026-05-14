import { plusesData } from './plusesData';
export default function Pluses() {
    return (
        <div className="border-y border-gray-200 bg-white">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center justify-center gap-3 divide-gray-100 px-5 py-10 max-md:grid-cols-1 max-md:divide-y md:divide-x">
                {plusesData.map((plus) => (
                    <div
                        className="flex items-center justify-center gap-3 max-md:justify-start max-md:py-5"
                        key={plus.title}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                            <plus.icon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {plus.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {plus.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

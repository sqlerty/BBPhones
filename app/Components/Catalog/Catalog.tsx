import Phones from './Phones/Phones';
import SortBar from './SortBar/SortBar';
import TitleBar from './TitleBar/TitleBar';

export default function Catalog() {
    return (
        <div className="bg-gray-50">
            <TitleBar />
            <SortBar />
            <Phones />
        </div>
    );
}

import Banner from './Components/Banner/Banner';
import Catalog from './Components/Catalog/Catalog';

import Pluses from './Components/Pluses/Pluses';

export default function Home() {
    return (
        <main>
            <section>
                <Banner />
            </section>
            <section>
                <Pluses />
            </section>
            <section>
                <Catalog />
            </section>
        </main>
    );
}

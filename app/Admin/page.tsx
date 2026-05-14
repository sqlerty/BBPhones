import AdminPage from './Components/AdminPage';
import { checkAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
        redirect('/');
    }
    return (
        <div>
            <AdminPage />
        </div>
    );
}

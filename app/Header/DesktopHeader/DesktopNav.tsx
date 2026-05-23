'use client';
import { useUser, useIsAdmin } from '../../stores/profileStore';
import { useCartCount } from '@/app/stores/profileStore';
import { navLinks } from '../HeaderData';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DesktopNav() {
    const user = useUser();
    const isAdmin = useIsAdmin();
    const cartLength = useCartCount();
    const pathname = usePathname();
    const router = useRouter();
    const filteredLinks = navLinks.filter((link) => {
        if (link.adminOnly) {
            return user?.role === 'ADMIN' && isAdmin;
        }
        return true;
    });
    const fullLinks = filteredLinks.filter(
        (link) => link.startLink == false || link.startLink == null
    );
    const someLinks = filteredLinks.filter(
        (link) => link.requariesAuth == false
    );
    return (
        <nav className="flex items-center justify-between gap-2">
            {user
                ? fullLinks.map((link) => {
                      const isActive = pathname === link.to;
                      return (
                          <Link
                              key={link.to}
                              href={link.to}
                              className={`relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 ${isActive ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'}`}
                              onClick={(e) => {
                                  if (!user && link.requariesAuth) {
                                      e.preventDefault();
                                      alert(
                                          'Пожалуйста, авторизуйтесь для доступа к этому разделу'
                                      );
                                      router.push('/Authorization');
                                  }
                              }}
                          >
                              <link.icon className="h-6 w-6" />
                              <p>{link.label}</p>
                              {cartLength > 0 && link.to == '/Cart' && (
                                  <span className="absolute top-0 right-0 flex h-4 w-4 translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                                      {cartLength}
                                  </span>
                              )}
                          </Link>
                      );
                  })
                : someLinks.map((link) => {
                      const isActive = pathname === link.to;
                      return (
                          <Link
                              key={link.to}
                              href={link.to}
                              className={`relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 ${isActive ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'}`}
                              onClick={(e) => {
                                  if (!user && link.requariesAuth) {
                                      e.preventDefault();
                                      alert(
                                          'Пожалуйста, авторизуйтесь для доступа к этому разделу'
                                      );
                                      router.push('/Authorization');
                                  }
                              }}
                          >
                              <link.icon className="h-6 w-6" />
                              <p>{link.label}</p>
                              {cartLength > 0 && link.to == '/Cart' && (
                                  <span className="absolute top-0 right-0 flex h-4 w-4 translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                                      {cartLength}
                                  </span>
                              )}
                          </Link>
                      );
                  })}
        </nav>
    );
}

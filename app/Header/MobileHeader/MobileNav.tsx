import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { navLinks } from '../HeaderData';
import { useCartCount, useIsAdmin, useUser } from '@/app/stores/profileStore';
import { usePathname, useRouter } from 'next/navigation';

interface IMobile {
    setMobileMenu: (i: boolean) => void;
}

export default function MobileNav({ setMobileMenu }: IMobile) {
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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-x-0 top-18 z-40 border-b border-gray-100 bg-white shadow-xl md:hidden"
            >
                <div className="flex flex-col space-y-4 px-4 py-6">
                    {user
                        ? fullLinks.map((link) => {
                              const isActive = pathname === link.to;
                              const Icon = link.icon;
                              return (
                                  <Link
                                      key={link.to}
                                      href={link.to}
                                      onClick={(e) => {
                                          setMobileMenu(false);
                                          if (!user && link.requariesAuth) {
                                              e.preventDefault();
                                              alert(
                                                  'Пожалуйста, авторизуйтесь для доступа к этому разделу'
                                              );
                                              router.push('/Authorization');
                                          }
                                      }}
                                      className={`flex items-center space-x-3 rounded-xl px-4 py-3 transition-colors ${
                                          isActive
                                              ? 'bg-blue-50 font-medium text-blue-600'
                                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      }`}
                                  >
                                      <div className="relative">
                                          <Icon className="h-5 w-5" />
                                          {cartLength > 0 &&
                                              link.to == '/Cart' && (
                                                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                                      {cartLength}
                                                  </span>
                                              )}
                                      </div>
                                      <span>{link.label}</span>
                                  </Link>
                              );
                          })
                        : someLinks.map((link) => {
                              const isActive = pathname === link.to;
                              const Icon = link.icon;
                              return (
                                  <Link
                                      key={link.to}
                                      href={link.to}
                                      onClick={(e) => {
                                          setMobileMenu(false);
                                          if (!user && link.requariesAuth) {
                                              e.preventDefault();
                                              alert(
                                                  'Пожалуйста, авторизуйтесь для доступа к этому разделу'
                                              );
                                              router.push('/Authorization');
                                          }
                                      }}
                                      className={`flex items-center space-x-3 rounded-xl px-4 py-3 transition-colors ${
                                          isActive
                                              ? 'bg-blue-50 font-medium text-blue-600'
                                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      }`}
                                  >
                                      <div className="relative">
                                          <Icon className="h-5 w-5" />
                                          {cartLength > 0 &&
                                              link.to == '/Cart' && (
                                                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                                      {cartLength}
                                                  </span>
                                              )}
                                      </div>
                                      <span>{link.label}</span>
                                  </Link>
                              );
                          })}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

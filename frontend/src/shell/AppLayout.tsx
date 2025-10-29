import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HealthBadge from '../widgets/HealthBadge.tsx';

export default function AppLayout() {
     const loc = useLocation();
     const nav = useNavigate();

     const title = (() => {
          if (loc.pathname === '/') return 'Home';
          if (loc.pathname.startsWith('/dashboard')) return 'Dashboard';
          return 'My Personal Kitchen';
     })();

     const showBack = loc.pathname !== '/';

     return (
    <div className="min-h-full grid grid-rows-[auto_1fr_auto]">
      <header className="px-4 py-3 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button className="px-3 py-1 rounded border" onClick={() => nav(-1)}>
              Back
            </button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          {/* Swap this menu based on route and role */}
          <a className="hover:underline" href="/">File</a>
          <a className="hover:underline" href="/">Edit</a>
          <a className="hover:underline" href="/">About</a>
          <HealthBadge />
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="px-4 py-3 border-t bg-gray-50 text-sm flex items-center justify-between">
        <div>© {new Date().getFullYear()} My Personal Kitchen</div>
        <div className="flex gap-4">
          <a className="hover:underline" href="/contact">Contact us</a>
          <a className="hover:underline" href="/about">About us</a>
          <a className="hover:underline" href="/how-it-works">How it works</a>
        </div>
      </footer>
    </div>
   );
}
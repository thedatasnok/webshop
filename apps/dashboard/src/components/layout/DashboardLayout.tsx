import dashboardRoutes from '@/router/dashboard';
import { Logo, useSignOutMutation } from '@webshop/ui';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { NavLink, useOutlet } from 'react-router-dom';
import clsx from 'clsx';
import { RouteHref } from '@/router/enum';

/**
 * Dashboard layout component, rendered as a parent of the views that are
 * part of the dashboard.
 */
const DashboardLayout = () => {
  const outlet = useOutlet();
  const [signOut] = useSignOutMutation();

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <aside className='border-base-800 flex w-24 flex-shrink-0 flex-col border-r'>
        <NavLink to={RouteHref.DASHBOARD} className='my-2 h-10 p-2'>
          <span className='sr-only'>CGG Home</span>
          <Logo variant='small' />
        </NavLink>

        <nav className='flex-1'>
          {dashboardRoutes
            .filter((route) => route.sidebar)
            .map(({ icon: Icon, name, href }) => (
              <ul key={name}>
                <li>
                  <NavLink
                    to={href || RouteHref.DASHBOARD}
                    className={({ isActive }) =>
                      clsx(
                        'flex flex-col items-center p-2',
                        isActive && 'text-primary'
                      )
                    }
                  >
                    {Icon && <Icon className='h-8 w-8' />}
                    <p className='font-title font-semibold'>{name}</p>
                  </NavLink>
                </li>
              </ul>
            ))}
        </nav>

        <button
          onClick={() => signOut()}
          className='hover:bg-base-900 flex items-center justify-center gap-1 px-2 py-1'
        >
          <span className='sr-only'>Sign out</span>
          <RiLogoutBoxLine className='h-6 w-6' />
        </button>
      </aside>

      <main className='flex-1'>{outlet}</main>
    </div>
  );
};

export default DashboardLayout;

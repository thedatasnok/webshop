import dashboardRoutes from '@/router/dashboard';
import { Logo } from '@webshop/ui';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { NavLink, useOutlet } from 'react-router-dom';
import clsx from 'clsx';

const DashboardLayout = () => {
  const outlet = useOutlet();

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <aside className='border-base-700 flex w-24 flex-col border-r'>
        <Logo variant='small' className='my-2 h-10 p-2' />

        <nav className='flex-1'>
          {dashboardRoutes.map(({ icon: Icon, name, href }) => (
            <ul key={name}>
              <li>
                <NavLink
                  to={href || '/'}
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

        <button className='hover:bg-base-800 flex items-center justify-center gap-1 px-2 py-1'>
          <RiLogoutBoxLine className='h-6 w-6' />
        </button>
      </aside>

      <main>{outlet}</main>
    </div>
  );
};

export default DashboardLayout;

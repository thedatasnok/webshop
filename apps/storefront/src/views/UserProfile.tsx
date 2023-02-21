import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/navigation/NavigationBar';
import Button from '@webshop/ui/src/components/input/Button';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <main>
        <div className='mx-auto mt-4 flex max-w-screen-xl gap-32'>
          <div className='w-1/3'>
            <h1 className='font-title mb-2 text-3xl font-semibold uppercase'>
              Account Details
            </h1>
            <form id=''>
              <div className='flex flex-col py-1'>
                <label>E-mail</label>
                <input
                  id=''
                  type='email'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='E-mail'
                />
              </div>

              <div className='flex flex-col py-1'>
                <label>Name</label>
                <input
                  id=''
                  type='text'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='Name'
                />
              </div>
            </form>
            <div id='' className='rounded-sm py-5 text-xl'>
              <Button className='px-4'>Change password</Button>
            </div>
            <h1 className='font-title mt-8 mb-2 text-3xl font-semibold uppercase'>
              Delivery Address
            </h1>
            <form id=''>
              <div className='flex flex-col py-1'>
                <label>Street</label>
                <input
                  id=''
                  type='text'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='Street'
                />
              </div>

              <div className='flex flex-col py-1'>
                <label>City</label>
                <input
                  id=''
                  type='text'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='City'
                />
              </div>

              <div className='flex flex-col py-1'>
                <label>Postal Code</label>
                <input
                  id=''
                  type='text'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='Postal Code'
                />
              </div>

              <div className='flex flex-col py-1'>
                <label>Country</label>
                <input
                  id=''
                  type='text'
                  className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                  aria-label='Country'
                />
              </div>
            </form>
            <div id='' className='flex justify-end rounded-sm py-5 text-xl'>
              <Button className='px-4'>Save</Button>
            </div>
          </div>

          <div className='w-2/3'>
            <h1 className='font-title mb-2 text-3xl font-semibold uppercase'>
              Order History
            </h1>
            <div className='border-base-700 mb-4 w-1/3 flex-1 rounded-sm border px-2 py-1'>
              <input
                type='text'
                className='w-full bg-transparent focus:outline-none'
                placeholder='Search...'
                aria-label='Search'
              />
            </div>
            <div className='mx-auto mt-4 flex flex-wrap justify-between'>
              <h2 className='font-title mb-2 text-xl font-semibold uppercase'>
                Order #1337
              </h2>
              <h2 className='font-title mb-2 text-xl font-semibold uppercase'>
                25.12.2020 13:50
              </h2>
            </div>
            <h3>Status: Delivered</h3>
            <section id=''>
              {[...Array(3)].map((_, i) => (
                <div className='flex py-2' key={i}>
                  <div className='bg-base-800 h-24 w-48 rounded-sm' />
                  <p className='px-4'>3D GAMING</p>
                </div>
              ))}
            </section>
            <h3 className='flex justify-end'>Total: $2,000,000</h3>
          </div>
        </div>
      </main>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default UserProfile;

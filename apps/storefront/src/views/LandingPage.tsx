import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <PageLayout>
      <main>
        <section
          id='hero'
          className='h-[28rem] w-full bg-cover'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80)',
          }}
        >
          <div className='from-base via-base/20 to-base flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b'>
            <h1 className='font-title mt-16 text-center text-4xl font-bold'>
              Gaming gear that just makes you better, <br /> faster, stronger
              and more awesome.
            </h1>

            <NavLink to='/products'>
              <Button className='font-title rounded-sm text-lg font-bold'>
                Browse shop
              </Button>
            </NavLink>
          </div>
        </section>

        <div className='mx-auto flex w-full max-w-screen-xl flex-col'>
          <h2 className='font-title my-4 text-center text-2xl font-bold uppercase tracking-wider'>
            Categories
          </h2>

          <section id='categories'>
            <div className='flex items-center justify-center gap-8'>
              {[...Array(10)].map((_, i) => (
                <div key={i}>
                  <div className='bg-base-800 aspect-square h-16 rounded-sm' />
                  <p className='text-center text-sm font-medium'>category</p>
                </div>
              ))}
            </div>
          </section>

          <h2 className='font-title mt-8 mb-4 text-center text-2xl font-bold uppercase tracking-wider'>
            Featured products
          </h2>

          <section
            id='featured-products'
            className='grid w-full grid-cols-4 items-center justify-items-center gap-8'
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex w-full flex-col'>
                <div className='bg-base-800 aspect-video w-full rounded-sm' />
                <div className='flex justify-between text-lg font-medium'>
                  <p>product</p>
                  <p>$3,333</p>
                </div>

                <NavLink to='/products/1' className='self-end'>
                  <Button className='w-min rounded-sm'>buy</Button>
                </NavLink>
              </div>
            ))}
          </section>

          <h2 className='font-title mt-12 mb-4 text-center text-2xl font-bold uppercase tracking-wider'>
            Testimonials
          </h2>

          <section id='testimonials'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={clsx(
                  'mb-8 flex gap-2',
                  i % 2 !== 0 && 'flex-row-reverse text-right'
                )}
              >
                <div className='bg-base-800 aspect-square h-24 rounded-sm' />
                <div className='max-w-lg'>
                  <h3 className='font-title text-lg font-semibold'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className='text-base-300'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sunt quibusdam, ad consequuntur illum suscipit molestiae
                    expedita nobis omnis debitis nemo reprehenderit deleniti,
                    optio similique recusandae explicabo vel! Neque, alias hic.
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default LandingPage;

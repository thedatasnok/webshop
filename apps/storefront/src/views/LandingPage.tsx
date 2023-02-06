import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@webshop/ui';
import clsx from 'clsx';

const LandingPage = () => {
  return (
    <div>
      <Header className='absolute top-0 w-full z-10' />

      <main>
        <section
          id='hero'
          className='h-[28rem] w-full bg-cover'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80)',
          }}
        >
          <div className='bg-gradient-to-b from-base via-base/20 to-base w-full h-full flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-4xl font-title font-bold text-center mt-16'>
              Gaming gear that just makes you better, <br /> faster, stronger
              and more awesome.
            </h1>
            <Button className='font-title text-lg font-bold rounded-sm'>
              Browse shop
            </Button>
          </div>
        </section>

        <div className='flex flex-col max-w-screen-xl w-full mx-auto'>
          <h2 className='font-title text-center font-bold text-2xl uppercase my-4 tracking-wider'>
            Categories
          </h2>

          <section id='categories'>
            <div className='flex gap-8 items-center justify-center'>
              {[...Array(10)].map((_, i) => (
                <div key={i}>
                  <div className='h-16 aspect-square rounded-sm bg-base-800' />
                  <p className='text-sm text-center font-medium'>category</p>
                </div>
              ))}
            </div>
          </section>

          <h2 className='font-title text-center font-bold text-2xl uppercase mt-8 mb-4 tracking-wider'>
            Featured products
          </h2>

          <section
            id='featured-products'
            className='grid grid-cols-4 items-center justify-items-center gap-8 w-full'
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex flex-col w-full'>
                <div className='w-full aspect-video rounded-sm bg-base-800' />
                <div className='flex justify-between text-lg font-medium'>
                  <p>product</p>
                  <p>$3,333</p>
                </div>
                <Button className='self-end w-min rounded-sm'>buy</Button>
              </div>
            ))}
          </section>

          <h2 className='font-title text-center font-bold text-2xl uppercase mt-12 mb-4 tracking-wider'>
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
                <div className='h-24 aspect-square rounded-sm bg-base-800' />
                <div className='max-w-lg'>
                  <h3 className='font-title font-semibold text-lg'>
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

      <Footer />
    </div>
  );
};

export default LandingPage;

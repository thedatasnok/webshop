import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@webshop/ui';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <section
        id='hero'
        className='absolute top-0 -z-20 h-[36rem] w-full bg-cover'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80)',
        }}
      >
        <div className='bg-gradient-to-b from-base to-base via-transparent w-full h-full flex flex-col gap-4 items-center justify-center'>
          <h1 className='text-4xl font-title font-bold text-center'>
            Gaming gear that just makes you better, <br /> faster, stronger and
            more awesome.
          </h1>
          <Button className='font-title text-lg font-bold rounded-sm'>
            Browse shop
          </Button>
        </div>
      </section>

      <section id='categories' className='mt-[36rem]'>
        <div className='flex gap-8 items-center justify-center'>
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <div className='h-16 aspect-square rounded-sm bg-base-800' />
              <p className='text-sm text-center font-medium'>category</p>
            </div>
          ))}
        </div>
      </section>

      <section id='featured-products'></section>

      <Footer />
    </div>
  );
};

export default LandingPage;

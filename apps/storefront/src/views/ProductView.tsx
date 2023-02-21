import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Button } from '@webshop/ui';

const ProductView = () => {
  return (
    <div>
      <Header />
      <main>
        <div className='mx-auto mt-4 flex max-w-screen-xl flex-wrap'>
          <div className='text-base-400 space-x-2 text-sm'>
            <a href='#' className='hover:underline'>
              Mousepads
            </a>
            <span>/</span>
            <a href='#' className='hover:underline'>
              3D Gaming Mousepad
            </a>
          </div>
        </div>

        <div className='mx-auto flex max-w-screen-xl flex-wrap gap-4 py-4'>
          <div className='relative w-1/2'>
            <img
              className='clip-edges clip-corner-sm aspect-square'
              src='https://placehold.co/768x768/d4d4d8/d4d4d8.png'
              alt={undefined || 'product-image'} // read from product in the future
            />

            <div className='bg-base-900 font-title absolute bottom-0 right-1/4 translate-y-1/2 translate-x-full px-2 py-1 font-bold uppercase tracking-widest '>
              #98320
            </div>
          </div>
          <div className='flex-1 px-4'>
            <h1 className='font-title text-base-50 mb-2 text-4xl font-bold uppercase'>
              3D Gaming Mousepad
            </h1>
            <p className='text-base-300 mb-8 max-w-lg'>
              Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
              exercitationem porro saepe ea harum corrupti vero id laudantium
              enim, libero blanditiis expedita cupiditate a est.
            </p>
            <h2 className='text-base-50 text-xl font-semibold'>$1,337</h2>
            <Button className='mt-2 h-10 px-6 font-semibold uppercase'>
              Add to Cart
            </Button>
          </div>
        </div>

        <div className='mx-auto mt-4 grid max-w-screen-xl grid-cols-2 gap-24'>
          <div>
            <h2 className='font-title mb-2 text-3xl font-semibold uppercase'>
              Description
            </h2>
            <hr className='mb-8'></hr>
            <p>
              This mouse pad is made of a special type of polymer that can
              change its shape and texture in response to different in-game
              environments. The pad has advanced sensors that detect the
              player's movements and translate them into in-game actions,
              allowing for precise and intuitive control. This pad is connected
              to a gaming computer or console, and would be able to display
              different dimensions and environments through the use of
              holographic technology. This mouse pad is made of a special type
              of polymer that can change its shape and texture in response to
              different in-game environments. The pad has advanced sensors that
              detect the player's movements and translate them into in-game
              actions, allowing for precise and intuitive control. This pad is
              connected to a gaming computer or console, and would be able to
              display different dimensions and environments through the use of
              holographic technology.
            </p>
          </div>
          <div>
            <h2 className='font-title mb-2 text-3xl font-semibold uppercase'>
              Specs
            </h2>
            <hr className='mb-8'></hr>
            <ul>
              <li>- 100k dpi</li>
              <li>- 10000000k colors</li>
              <li>- incredible precision</li>
              <li>- for kill in video fps games, -turbo mode neon-</li>
            </ul>
          </div>
        </div>

        <h2 className='font-title mt-32 mb-4 text-center text-2xl font-bold uppercase tracking-wider'>
          Related products
        </h2>

        <section
          id='related-products'
          className='mx-auto mt-4 grid max-w-screen-xl grid-cols-4 gap-8'
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className='flex w-full flex-col'>
              <div className='bg-base-800 aspect-video w-full rounded-sm' />
              <div className='flex justify-between text-lg font-medium'>
                <p>product</p>
                <p>$3,333</p>
              </div>
              <Button className='w-min self-end rounded-sm'>buy</Button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default ProductView;

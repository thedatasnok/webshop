import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Button from '@webshop/ui/src/components/input/Button';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <main>
        <div className='mx-auto flex max-w-screen-xl flex-wrap mt-4'>
          <div className='space-x-2 text-sm text-base-400'>
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
          <img
            id=''
            className='h-max w-max'
            src='https://placehold.co/768x768/d4d4d8/d4d4d8.png'
          />
          <div className='flex-1 px-4'>
            <h1 className='mb-2 text-4xl font-title uppercase font-bold text-base-50'>
              3D Gaming Mousepad
            </h1>
            <p className='mb-8 max-w-lg text-base-300'>
              Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
              exercitationem porro saepe ea harum corrupti vero id laudantium
              enim, libero blanditiis expedita cupiditate a est.
            </p>
            <h2 className='text-xl text-base-50 font-semibold'>$1,337</h2>
            <button
              type='button'
              className='mt-2 h-10 bg-primary-500 px-6 font-semibold uppercase text-base-900 hover:bg-primary-200'
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className='mx-auto grid grid-cols-2 max-w-screen-xl gap-24 mt-4'>
          <div>
            <h2 className='mb-2 text-3xl font-title uppercase font-semibold'>
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
            <h2 className='mb-2 text-3xl font-title uppercase font-semibold'>
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

        <h2 className='font-title text-center font-bold text-2xl uppercase mt-32 mb-4 tracking-wider'>
          Related products
        </h2>

        <section
          id='related-products'
          className='mx-auto grid grid-cols-4 max-w-screen-xl gap-8 mt-4'
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductView;

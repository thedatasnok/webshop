import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import { useFindProductQuery, useFindProductsQuery } from '@/services/products';
import { Disclosure } from '@headlessui/react';
import { Button } from '@webshop/ui';
import { useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();
  console.log(id);

  const { data: productInfo } = useFindProductQuery(parseInt(id!));
  const { data: products } = useFindProductsQuery();

  return (
    <PageLayout>
      <main>
        <div className='mx-auto mt-4 max-w-screen-xl'>
          <div className='text-base-400 space-x-2 text-sm'>
            <a href='#' className='hover:underline'>
              Mousepads
            </a>
            <span>/</span>
            <a href='#' className='hover:underline'>
              {productInfo?.name}
            </a>
          </div>
        </div>

        <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-4 py-4 sm:flex-row'>
          <div className='relative sm:w-1/2'>
            <img
              className='clip-edges clip-corner-sm'
              src='https://placehold.co/768x768/d4d4d8/d4d4d8.png'
              alt={undefined || 'product-image'} // read from product in the future
            />

            <div className='bg-base-900 font-title absolute bottom-0 right-1/4 translate-y-1/2 translate-x-full px-2 py-1 font-bold uppercase tracking-widest '>
              #98320
            </div>
          </div>
          <div className='flex-1 px-4'>
            <h1 className='font-title text-base-50 mb-2 text-4xl font-bold uppercase'>
              {productInfo?.name}
            </h1>
            <p className='text-base-300 mb-8 max-w-lg'>
              {productInfo?.description}
            </p>
            <h2 className='text-base-50 text-xl font-semibold'>
              {'$' + productInfo?.price}
            </h2>
            <Button className='mt-2 h-10 w-full px-6 font-semibold uppercase sm:w-fit'>
              Add to Cart
            </Button>
          </div>
        </div>
        <div className='mx-auto mt-4 hidden max-w-screen-xl gap-24 sm:grid sm:grid-cols-2'>
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

        <div className='mx-auto mt-4 max-w-screen-xl flex-col gap-24'>
          <div>
            <div className='block sm:hidden'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='w-full py-2'>
                      <h2 className='font-title items-center justify-center text-3xl font-semibold uppercase'>
                        Description
                      </h2>
                      <span>
                        <RiArrowUpSLine
                          className={
                            open ? 'w-full rotate-180 transform' : 'w-full'
                          }
                        ></RiArrowUpSLine>
                      </span>

                      <hr className='mb-4'></hr>
                    </Disclosure.Button>
                    <Disclosure.Panel className='pb-8 text-gray-500'>
                      This mouse pad is made of a special type of polymer that
                      can change its shape and texture in response to different
                      in-game environments. The pad has advanced sensors that
                      detect the player's movements and translate them into
                      in-game actions, allowing for precise and intuitive
                      control. This pad is connected to a gaming computer or
                      console, and would be able to display different dimensions
                      and environments through the use of holographic
                      technology. This mouse pad is made of a special type of
                      polymer that can change its shape and texture in response
                      to different in-game environments. The pad has advanced
                      sensors that detect the player's movements and translate
                      them into in-game actions, allowing for precise and
                      intuitive control. This pad is connected to a gaming
                      computer or console, and would be able to display
                      different dimensions and environments through the use of
                      holographic technology.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <p></p>
          </div>
          <div className='block sm:hidden'>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='w-full py-2'>
                    <h2 className='font-title items-center justify-center text-3xl font-semibold uppercase'>
                      SPECS
                    </h2>
                    <span>
                      <RiArrowUpSLine
                        className={
                          open ? 'w-full rotate-180 transform' : 'w-full'
                        }
                      ></RiArrowUpSLine>
                    </span>
                    <hr className='mb-4'></hr>
                  </Disclosure.Button>
                  <Disclosure.Panel className='pb-8 text-gray-500'>
                    <ul>
                      <li>- 100k dpi</li>
                      <li>- 10000000k colors</li>
                      <li>- incredible precision</li>
                      <li>- for kill in video fps games, -turbo mode neon-</li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>

        <h2 className='font-title mt-16 mb-4 text-center text-2xl font-bold uppercase tracking-wider sm:mt-32'>
          Related products
        </h2>

        <section id='products-temp'>
          <div className='mx-auto grid w-fit max-w-screen-xl grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-3'>
            {products?.map((product, i) => (
              <ProductCard
                key={product.id}
                to={'/products/' + product.id}
                name={product.name}
                price={product.price + '$'}
                image={product.imageUrls[0]}
              />
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default ProductView;

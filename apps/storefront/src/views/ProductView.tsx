import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import { RouteHref } from '@/router';
import {
  useFindProductQuery,
  useRelatedProductsQuery,
} from '@/services/products';
import { addToCart } from '@/store/cart.slice';
import { Disclosure } from '@headlessui/react';
import { Button, GroupedTable, formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { RiArrowUpSLine, RiShoppingCartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { NavLink, Navigate, useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();
  const parsedId = Number(id);
  const { data: productInfo, isError } = useFindProductQuery(parsedId);
  const { data: relatedProducts } = useRelatedProductsQuery(parsedId);
  const dispatch = useDispatch();

  const add = () => {
    if (productInfo) {
      dispatch(addToCart(productInfo.id));
    }
  };

  if (!productInfo && isError) {
    return <Navigate to={RouteHref.NOT_FOUND} />;
  }

  return (
    <PageLayout>
      <main>
        <div className='mx-auto mt-4 max-w-screen-xl'>
          <div className='text-base-400 font-title space-x-2 text-sm font-semibold uppercase transition-all'>
            <NavLink
              to={RouteHref.HOME}
              className='hover:text-base-300 transition-colors hover:underline'
            >
              Home
            </NavLink>
            <span>/</span>
            <NavLink
              to={RouteHref.PRODUCTS}
              className='hover:text-base-300 transition-colors hover:underline'
            >
              Browse
            </NavLink>
            <span>/</span>
            <NavLink
              to='#'
              className='text-base-300 transition-colors hover:underline'
            >
              {productInfo?.name}
            </NavLink>
          </div>
        </div>

        <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-4 py-4 sm:flex-row'>
          <div className='relative sm:w-1/2'>
            <img
              className='clip-edges clip-corner-sm'
              src={productInfo?.imageUrls[0]}
              alt={productInfo?.name}
            />

            <div className='bg-base-950 font-title absolute bottom-0 right-1/4 translate-x-full translate-y-1/2 px-2 py-1 font-bold uppercase tracking-widest '>
              #{productInfo?.id.toString().padStart(4, '0')}
            </div>
          </div>

          <div className='flex-1 px-4'>
            <h1 className='font-title text-base-50 mb-2 text-4xl font-bold uppercase'>
              {productInfo?.name}
            </h1>

            <p className='text-base-400 preserve-line mb-2 max-w-lg text-sm'>
              {productInfo?.shortDescription}
            </p>

            <div className='mb-2 flex flex-wrap items-center gap-1'>
              {productInfo?.variants.map((variant) => (
                <NavLink
                  key={variant.id}
                  to={[RouteHref.PRODUCTS, variant.id].join('/')}
                  className={clsx(
                    'border-base-800 font-title rounded-sm border px-1 uppercase tracking-wide outline-none',
                    variant.id === productInfo.id &&
                      'border-primary text-primary bg-base-900/10'
                  )}
                >
                  {variant.shortName}
                </NavLink>
              ))}
            </div>

            <span
              className={clsx(
                'text-base-100 font-title text-2xl font-bold',
                productInfo?.isDiscount && 'text-primary'
              )}
            >
              {formatPrice(productInfo?.price || 0)}
            </span>

            <span
              title={`Previously ${formatPrice(
                productInfo?.previousPrice || 0
              )}`}
              className='text-base-400 font-title preserve-line ml-2 font-semibold uppercase'
            >
              {productInfo?.isDiscount && (
                <>Prev. {formatPrice(productInfo.previousPrice)}</>
              )}
            </span>

            <Button size='md' onClick={add} className='mt-4 block'>
              <span>Add to Cart</span>
              <RiShoppingCartLine className='-mt-0.5 h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='mx-auto mt-4 hidden max-w-screen-xl gap-16 md:grid md:grid-cols-2'>
          <div>
            <h2 className='font-title text-3xl font-semibold uppercase'>
              Description
            </h2>

            <hr className='text-base-800 mb-2' />

            <p className='text-base-300 whitespace-pre-line text-sm'>
              {productInfo?.description}
            </p>
          </div>

          <div>
            <h2 className='font-title text-3xl font-semibold uppercase'>
              Specs
            </h2>

            <hr className='text-base-800 mb-2' />

            {productInfo && <GroupedTable data={productInfo.attributes} />}
          </div>
        </div>

        <div className='mx-auto mt-4 max-w-screen-xl flex-col gap-24'>
          <div>
            <div className='block md:hidden'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full flex-col items-center pt-2'>
                      <h2 className='font-title text-3xl font-semibold uppercase'>
                        Description
                      </h2>

                      <RiArrowUpSLine
                        className={clsx(
                          'h-4 w-4',
                          open && 'rotate-180 transform'
                        )}
                      />
                    </Disclosure.Button>

                    <hr className='text-base-800 mb-2' />

                    <Disclosure.Panel className='pb-4 text-gray-500'>
                      <p className='text-base-300 whitespace-pre-line text-sm'>
                        {productInfo?.description}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <p></p>
          </div>

          <div className='block md:hidden'>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex w-full flex-col items-center pt-2'>
                    <h2 className='font-title text-3xl font-semibold uppercase'>
                      Specs
                    </h2>

                    <RiArrowUpSLine
                      className={clsx(
                        'h-4 w-4',
                        open && 'rotate-180 transform'
                      )}
                    />
                  </Disclosure.Button>

                  <hr className='text-base-800 mb-2' />

                  <Disclosure.Panel className='pb-4 text-gray-500'>
                    {productInfo && (
                      <GroupedTable data={productInfo.attributes} />
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>

        <h2 className='font-title my-4 text-center text-3xl font-bold uppercase tracking-wider sm:mt-16 md:mt-32'>
          Related products
        </h2>

        <section id='products-temp'>
          <div className='mx-auto grid w-fit max-w-screen-xl grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
            {relatedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                to={'/products/' + product.id}
                name={product.name}
                previousPrice={product.previousPrice}
                price={product.price}
                shortDescription={product.shortDescription}
                isDiscount={product.isDiscount}
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

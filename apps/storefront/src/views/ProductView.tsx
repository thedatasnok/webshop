import PageLayout from '@/components/layout/PageLayout';
import NavigationCard from '@/components/navigation/NavigationCard';
import OnSalePill from '@/components/product/OnSalePill';
import ProductCard from '@/components/product/ProductCard';
import ProductChildren from '@/components/product/ProductChildren';
import { RouteHref } from '@/router';
import { addToCart } from '@/store/cart.slice';
import { Disclosure } from '@headlessui/react';
import {
  Button,
  GroupedTable,
  formatPrice,
  useFindProductQuery,
  useRelatedProductsQuery,
} from '@webshop/ui';
import clsx from 'clsx';
import {
  RiArrowUpSLine,
  RiShoppingCartLine,
  RiStore2Line,
} from 'react-icons/ri';
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
    <PageLayout className='mx-auto w-full max-w-screen-xl flex-1'>
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

      {/* Main product section */}
      <section
        aria-label='Product information'
        className='flex w-full flex-col gap-4 py-4 sm:flex-row'
      >
        <div className='relative h-fit sm:w-1/2'>
          <img
            className='clip-edges clip-corner-sm'
            src={productInfo?.imageUrls[0]}
            alt={productInfo?.name}
          />

          <div className='bg-base-950 font-title absolute bottom-0 right-1/4 translate-x-full translate-y-1/2 px-2 py-1 font-bold uppercase tracking-widest '>
            #{productInfo?.id.toString().padStart(4, '0')}
          </div>

          {productInfo?.isDiscount && (
            <OnSalePill className='absolute right-2 top-2 text-xl' />
          )}
        </div>

        <div className='flex-1 md:pl-4'>
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

          {productInfo && productInfo.price === null && (
            <p className='text-base-300'>This product has been discontinued.</p>
          )}

          {productInfo?.price !== null && (
            <>
              <span
                className={clsx(
                  'text-base-100 font-title text-2xl font-bold',
                  productInfo?.isDiscount && 'text-primary'
                )}
              >
                {formatPrice(productInfo?.price ?? 0)}
              </span>

              <span
                title={`Previously ${formatPrice(
                  productInfo?.previousPrice ?? 0
                )}`}
                className='text-base-400 font-title preserve-line ml-2 font-semibold uppercase'
              >
                {productInfo?.isDiscount && productInfo.previousPrice && (
                  <>Prev. {formatPrice(productInfo.previousPrice)}</>
                )}
              </span>

              <Button size='md' onClick={add} className='mt-4 block'>
                <span>Add to Cart</span>
                <RiShoppingCartLine className='-mt-0.5 h-4 w-4' />
              </Button>
            </>
          )}

          {/* Product children content */}
          <div className='max-md:hidden'>
            <ProductChildren children={productInfo?.children} />
          </div>
        </div>
      </section>

      {/* Mobile viewport placing of children */}
      <div className='md:hidden'>
        <ProductChildren children={productInfo?.children} />
      </div>

      <section
        aria-label='Product details'
        className='mx-auto mt-4 hidden gap-16 md:grid md:grid-cols-2'
      >
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
          <h2 className='font-title text-3xl font-semibold uppercase'>Specs</h2>

          <hr className='text-base-800 mb-2' />

          {productInfo && <GroupedTable data={productInfo.attributes} />}
        </div>
      </section>

      <div className='mt-4 flex-col gap-24'>
        <Disclosure as='div' className='md:hidden'>
          <Disclosure.Button className='flex w-full flex-col items-center pt-2'>
            <h2 className='font-title text-3xl font-semibold uppercase'>
              Description
            </h2>

            <RiArrowUpSLine className='ui-open:rotate-180 h-4 w-4 transform' />
          </Disclosure.Button>

          <hr className='text-base-800 mb-2' />

          <Disclosure.Panel className='pb-4 text-gray-500'>
            <p className='text-base-300 whitespace-pre-line text-sm'>
              {productInfo?.description}
            </p>
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className='md:hidden'>
          <Disclosure.Button className='flex w-full flex-col items-center pt-2'>
            <h2 className='font-title text-3xl font-semibold uppercase'>
              Specs
            </h2>

            <RiArrowUpSLine className='ui-open:rotate-180 h-4 w-4 transform' />
          </Disclosure.Button>

          <hr className='text-base-800 mb-2' />

          <Disclosure.Panel className='pb-4 text-gray-500'>
            {productInfo && <GroupedTable data={productInfo.attributes} />}
          </Disclosure.Panel>
        </Disclosure>

        <h2
          id='related-products-title'
          className='font-title my-4 text-center text-3xl font-bold uppercase tracking-wider sm:mt-16 md:mt-32'
        >
          Related products
        </h2>

        <section
          aria-labelledby='related-products-title'
          className='overflow-x-scroll pb-2'
        >
          <ol className='mx-auto flex w-fit justify-center gap-4'>
            {relatedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                to={[RouteHref.PRODUCTS, product.id].join('/')}
                name={product.name}
                previousPrice={product.previousPrice}
                shortDescription={product.shortDescription}
                isDiscount={product.isDiscount}
                price={product.price}
                image={product.imageUrls[0]}
                className='w-48 flex-shrink-0'
              />
            ))}

            {relatedProducts && relatedProducts.length > 1 && (
              <NavigationCard title='browse more' icon={RiStore2Line} />
            )}
          </ol>
        </section>
      </div>
    </PageLayout>
  );
};

export default ProductView;

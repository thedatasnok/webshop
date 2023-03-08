import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import { RiGridFill, RiListCheck } from 'react-icons/ri';

const ProductBrowser = () => {
  return (
    <PageLayout>
      <main>
        <div className='mx-auto w-full max-w-screen-xl'>
          <div id='cart-title' className='py-4'>
            <h1 className='mb-4 flex text-3xl'>Browse</h1>
            <p>
              Explore our newest insane gaming gear that will enhance your aim
              in CS:GO Source 7 and Half life 3
            </p>
          </div>

          <section id='categories'>
            <div className='mx-auto mt-10 mb-5 flex w-fit grid-cols-4 flex-wrap justify-center justify-items-center gap-2'>
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className='bg-base-800 aspect-square h-28 rounded-sm' />
                  <p className='text-center text-sm font-medium'>category</p>
                </div>
              ))}
            </div>
          </section>

          <div className='flex flex-col-reverse sm:ml-20 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className=''>showing x results for ""</h2>

            {/* <div className='mt-7 flex items-center justify-center gap-2'>
            <h2 className='md:pr-6 lg:pr-96'>showing x results for ""</h2>
            <button>sort</button>
            <button>grid</button>
            <button>list</button>
          </div> */}

            <div className='my-2 mr-0 flex items-center sm:mr-20 sm:gap-2'>
              <div className='w-full'>
                <select
                  id='sort'
                  defaultValue='name'
                  className='bg-base-800 border-base-800 h-8 w-full border'
                >
                  <option value='name'>Name</option>
                  <option value='pricelowtohigh'>Price low-high</option>
                  <option value='pricehightolow'>Price high-low</option>
                  <option value='discount'>Discount</option>
                </select>
              </div>
              <button>
                <RiGridFill className='hidden h-12 w-12 sm:block md:h-8 md:w-8' />
              </button>
              <button>
                <RiListCheck className='hidden h-12 w-12 sm:block md:h-8 md:w-8' />
              </button>
            </div>
          </div>

          <section id='products'>
            <div className='mx-auto grid w-fit grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4'>
              {[...Array(9)].map((_, i) => (
                <div key={i}>
                  <ProductCard
                    to={'/products/1'}
                    name={'3d gaming mousepad'}
                    price={'$1,337.00'}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default ProductBrowser;

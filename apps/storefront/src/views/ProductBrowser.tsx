import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/navigation/ProductCard';

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
            <div className='mx-auto mt-10 mb-5 grid w-fit grid-cols-4 justify-center justify-items-center gap-x-8 lg:grid-cols-8'>
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className='bg-base-800 aspect-square h-16 rounded-sm' />
                  <p className='text-center text-sm font-medium'>category</p>
                </div>
              ))}
            </div>
          </section>

          <div className='mt-7 flex items-center justify-center gap-2'>
            <h2 className='md:pr-6 lg:pr-96'>showing x results for ""</h2>
            <button>sort</button>
            <button>grid</button>
            <button>list</button>
          </div>

          <section id='products'>
            <div className='mx-auto mt-10 mb-5 grid w-fit grid-cols-1 justify-center justify-items-center gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3'>
              {[...Array(9)].map((_, i) => (
                <div key={i}>
                  <ProductCard to={'/products/1'} name={'3d gaming mousepad'} price={'$1,337.00'} />
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

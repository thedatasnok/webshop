import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFindProductsQuery } from '@/services/products';
import { CategoryDto } from '@webshop/contracts';
import clsx from 'clsx';
import { useState } from 'react';
import { RiGamepadLine, RiGridFill, RiListCheck } from 'react-icons/ri';

const ProductBrowser = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>();
  const categoryId =
    selectedCategory === undefined ? undefined : [selectedCategory.id];
  const { data: products } = useFindProductsQuery({
    categoryId,
  });
  const { data: categories } = useGetCategoriesQuery();

  function handleCategoryClick(category: CategoryDto) {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(category);
    }
  }

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
            <div className='mx-auto mt-10 mb-5 grid w-full grid-cols-4 gap-2 lg:grid-cols-8'>
              {categories?.map((category, i) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={clsx(
                    'border-base-800 bg-base-800/10 lg:hover:border-primary flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none lg:transition lg:hover:scale-110',
                    selectedCategory?.id === category.id &&
                      'text-primary  border-primary'
                  )}
                >
                  <RiGamepadLine className='h-14 w-14 sm:h-24 sm:w-24 lg:h-24 lg:w-24' />
                  <p className='text-center text-sm font-medium'>
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
          </section>
          <div className='mt-12 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between'>
            <h2 className=''>showing x results for ""</h2>

            <div className='my-2 mr-0 flex items-center sm:gap-2'>
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
                <RiGridFill className='hidden  h-8 w-8 sm:block' />
              </button>
              <button>
                <RiListCheck className='hidden h-8 w-8 sm:block' />
              </button>
            </div>
          </div>
          <section id='products'>
            <div className='mx-auto grid w-fit grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
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
        </div>
      </main>
    </PageLayout>
  );
};

export default ProductBrowser;

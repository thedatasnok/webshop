import CategoryCard from '@/components/category/CategoryCard';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import ProductListCard from '@/components/product/ProductListCard';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFindProductsQuery } from '@/services/products';
import { CategoryDto } from '@webshop/contracts';
import { formatPrice } from '@webshop/ui/src/utilities';
import clsx from 'clsx';
import { useState } from 'react';
import { RiGridFill, RiListCheck } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

const ProductBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategoryId = searchParams.get('category');
  const parsedCategoryId = paramCategoryId
    ? parseInt(paramCategoryId)
    : undefined;

  const { data: products } = useFindProductsQuery({
    categoryId: parsedCategoryId ? [parsedCategoryId] : undefined,
  });

  const { data: categories } = useGetCategoriesQuery();

  const [isGridSelected, setIsGridSelected] = useState(true);

  const handleGridButtonClick = () => {
    setIsGridSelected(true);
  };

  const handleListButtonClick = () => {
    setIsGridSelected(false);
  };

  function handleCategoryClick(category: CategoryDto) {
    if (parsedCategoryId === category.id) {
      setSearchParams({});
    } else {
      setSearchParams({ category: category.id.toString() });
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
            <div className='mx-auto mb-5 mt-10 grid w-full grid-cols-4 gap-2 lg:grid-cols-8'>
              {categories?.map((category, i) => (
                <button
                  onClick={() => handleCategoryClick(category)}
                  key={category.id}
                >
                  <CategoryCard
                    id={category.id}
                    name={category.name}
                    iconUrl={category.iconUrl}
                    selected={parsedCategoryId === category.id}
                  />
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

              <button onClick={handleGridButtonClick}>
                <RiGridFill
                  className={clsx('h-8 w-8', {
                    'text-primary-300': isGridSelected,
                  })}
                ></RiGridFill>
              </button>

              <button onClick={handleListButtonClick}>
                <RiListCheck
                  className={clsx('h-8 w-8', {
                    'text-primary-300': !isGridSelected,
                  })}
                />
              </button>
            </div>
          </div>

          <section id='products'>
            <div
              className={clsx({
                'grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5':
                  isGridSelected,
                'mx-auto grid grid-cols-1': !isGridSelected,
              })}
            >
              {products?.map((product, i) => (
                <div key={product.id}>
                  {isGridSelected ? (
                    <ProductCard
                      id={product.id}
                      to={'/products/' + product.id}
                      name={product.name}
                      previousPrice={product.previousPrice}
                      price={product.price}
                      shortDescription={product.shortDescription}
                      isDiscount={product.isDiscount}
                      image={product.imageUrls[0]}
                    />
                  ) : (
                    <ProductListCard
                      to={'/products/' + product.id}
                      name={product.name}
                      shortDescription={product.shortDescription}
                      image={product.imageUrls[0]}
                    >
                      <ProductListActions
                        price={product.price}
                        isDiscount={product.isDiscount}
                        previousPrice={product.previousPrice}
                      />
                    </ProductListCard>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

interface ProductListActionsProps {
  price: number;
  previousPrice: number;
  isDiscount: boolean;
}

const ProductListActions: React.FC<ProductListActionsProps> = ({
  price,
  previousPrice,
  isDiscount,
}) => {
  return (
    <div className='flex flex-col-reverse'>
      <h3
        className={clsx({
          'text-primary-200 flex justify-end text-xl': isDiscount,
          '': !isDiscount,
        })}
      >
        {formatPrice(price)}
      </h3>
      {isDiscount && (
        <div className='text-base-400 ml-1 mt-1 flex justify-end whitespace-nowrap line-through'>
          {formatPrice(previousPrice)}
        </div>
      )}
    </div>
  );
};

export default ProductBrowser;

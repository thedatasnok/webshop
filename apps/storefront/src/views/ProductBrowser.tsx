import CategoryCard from '@/components/category/CategoryCard';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import ProductListCard from '@/components/product/ProductListCard';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFindProductsQuery } from '@/services/products';
import { CategoryDto } from '@webshop/contracts';
import { SortByField, SortDirection, formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { RiGridFill, RiListCheck } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

const PRODUCT_SORT_FIELDS = ['Price', 'Name', 'Discount'];

const ProductBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategoryId = searchParams.get('category');
  const paramSearch = searchParams.get('search');
  const parsedCategoryId = paramCategoryId
    ? Number(paramCategoryId)
    : undefined;

  const paramSortField = searchParams.get('sortBy') || PRODUCT_SORT_FIELDS[0];
  const paramSortDirection =
    (searchParams.get('sortDirection') as SortDirection) || SortDirection.ASC;

  const { data: products } = useFindProductsQuery({
    categoryId: parsedCategoryId ? [parsedCategoryId] : undefined,
    sortBy: paramSortField,
    sortDirection: paramSortDirection,
    name: paramSearch,
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
      setSearchParams((old) => {
        old.delete('category');
        return old;
      });
    } else {
      setSearchParams((old) => {
        old.set('category', category.id.toString());
        return old;
      });
    }
  }

  const onSortChange = (field: string, direction: SortDirection) => {
    setSearchParams((old) => {
      old.set('sortBy', field);
      old.set('sortDirection', direction);
      return old;
    });
  };

  return (
    <PageLayout>
      <main className='mx-auto w-full max-w-screen-xl'>
        <section id='hero' className='py-4'>
          <h1 className='font-title mb-2 flex text-2xl font-semibold uppercase'>
            Browse
          </h1>

          <p className='text-base-300 text-sm'>
            Explore our newest insane gaming gear that will enhance your aim in
            CS:GO Source 7 and Half life 3
          </p>
        </section>

        <section id='categories'>
          <div className='mx-auto my-2 grid w-full grid-cols-4 gap-2 lg:grid-cols-8'>
            {categories?.map((category) => (
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

        <div className='mt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between'>
          <h2
            className={clsx(
              'text-base-200 font-title text-sm font-semibold uppercase tracking-wide',
              !paramSearch && 'invisible'
            )}
          >
            Showing {products?.length} results for "{paramSearch}"
          </h2>

          <div className='my-2 mr-0 flex items-center sm:gap-2'>
            <span className='text-base-200 font-title text-sm font-semibold uppercase tracking-wide'>
              Sorting by
            </span>
            <SortByField
              direction={paramSortDirection}
              field={paramSortField}
              fields={PRODUCT_SORT_FIELDS}
              onChange={onSortChange}
            />

            <div className='flex items-center'>
              <button
                onClick={handleGridButtonClick}
                className={clsx(
                  'border-base-700 hover:bg-base-800 rounded-l-sm border transition-colors',
                  isGridSelected && 'text-primary'
                )}
              >
                <RiGridFill className='h-7 w-7' />
              </button>

              <button
                onClick={handleListButtonClick}
                className={clsx(
                  'border-base-700 hover:bg-base-800 rounded-l-sm border transition-colors',
                  !isGridSelected && 'text-primary'
                )}
              >
                <RiListCheck className='h-7 w-7' />
              </button>
            </div>
          </div>
        </div>

        {/* section or div? */}
        <section
          className={clsx({
            'grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5':
              isGridSelected,
          })}
        >
          {products?.map((product, i, array) => (
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
                  id={product.id}
                  name={product.name}
                  shortDescription={product.shortDescription}
                  isDiscount={product.isDiscount}
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
        </section>
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
      <p className='font-title truncate font-semibold tracking-wide'>
        <span
          className={clsx(
            'group-hover:text-primary-600 text-xl',
            isDiscount && 'text-primary-600'
          )}
        >
          {formatPrice(price)}
        </span>
        {isDiscount && (
          <span className='text-base-400 ml-2 text-sm'>
            PREV. {formatPrice(previousPrice)}
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductBrowser;

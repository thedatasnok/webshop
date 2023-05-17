import CategoryCard from '@/components/category/CategoryCard';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/product/ProductCard';
import ProductListCard from '@/components/product/ProductListCard';
import { RouteHref } from '@/router';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFindProductsQuery } from '@/services/products';
import { CategoryDto } from '@webshop/contracts';
import { SortByField, SortDirection, formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { RiGridFill, RiListCheck, RiSearchLine } from 'react-icons/ri';
import { NavLink, useSearchParams } from 'react-router-dom';

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

  const { data: products, isLoading } = useFindProductsQuery({
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

  const handleCategoryClick = (category: CategoryDto) => {
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
    <PageLayout className='mx-auto w-full max-w-screen-xl'>
      <h1 className='font-title mb-2 flex pt-4 text-2xl font-semibold uppercase'>
        Browse
      </h1>

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
                responsiveIcon
              />
            </button>
          ))}
        </div>
      </section>

      <div className='mt-2 flex flex-col sm:flex-row sm:justify-between'>
        <h2
          className={clsx(
            'text-base-200 font-title preserve-line text-sm font-semibold uppercase tracking-wide',
            !paramSearch && 'invisible'
          )}
        >
          Showing {products?.length} results for "{paramSearch}"
        </h2>

        <div className='my-1 mr-0 flex items-center justify-end gap-2'>
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
              <span className='sr-only'>Display as grid</span>
              <RiGridFill className='h-7 w-7' />
            </button>

            <button
              onClick={handleListButtonClick}
              className={clsx(
                'border-base-700 hover:bg-base-800 rounded-l-sm border transition-colors',
                !isGridSelected && 'text-primary'
              )}
            >
              <span className='sr-only'>Display as list</span>
              <RiListCheck className='h-7 w-7' />
            </button>
          </div>
        </div>
      </div>

      {!isLoading && products && products.length === 0 && (
        <div className='text-base-400 mx-auto my-16 flex max-w-xs flex-col items-center gap-1 text-center'>
          <RiSearchLine className='h-16 w-16' />
          <p className='text-sm'>
            Could not find any products matching your search criteria, try
            searching for something else or{' '}
            <NavLink
              to={RouteHref.PRODUCTS}
              className='hover:text-base-200 underline'
            >
              clear your search
            </NavLink>
            .
          </p>
        </div>
      )}

      <ol
        className={clsx(
          'gap-2',
          !isGridSelected && 'flex flex-col',
          isGridSelected &&
            'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
        )}
      >
        {products?.map((product) => (
          <Fragment key={product.id}>
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
                hoverEffects
              >
                <ProductListActions
                  price={product.price}
                  isDiscount={product.isDiscount}
                  previousPrice={product.previousPrice}
                />
              </ProductListCard>
            )}
          </Fragment>
        ))}
      </ol>
    </PageLayout>
  );
};

interface ProductListActionsProps {
  price: number;
  previousPrice: number | null;
  isDiscount: boolean;
}

const ProductListActions: React.FC<ProductListActionsProps> = ({
  price,
  previousPrice,
  isDiscount,
}) => {
  return (
    <div className='flex w-fit flex-col-reverse'>
      <p className='font-title truncate text-right font-semibold tracking-wide'>
        <span
          className={clsx(
            'group-hover:text-primary-600 text-xl',
            isDiscount && 'text-primary-600'
          )}
        >
          {formatPrice(price)}
        </span>
        {isDiscount && previousPrice && (
          <span className='text-base-400 ml-2 block text-sm sm:inline'>
            PREV. {formatPrice(previousPrice)}
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductBrowser;

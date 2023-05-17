import { ProductChildDetails } from '@webshop/contracts';
import ProductListCard from './ProductListCard';

export interface ProductChildrenProps {
  children?: ProductChildDetails[];
}

const ProductChildren: React.FC<ProductChildrenProps> = ({ children }) => {
  if (children === undefined || children.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className='font-title mt-4 text-lg font-semibold uppercase'>
        This package also contains the following:
      </h3>

      <div role='list' className=''>
        {children.map((child) => (
          <ProductListCard
            key={child.id}
            id={child.id}
            name={child.name}
            image={child.imageUrls[0]}
            to={`/products/${child.id}`}
            shortDescription={child.description}
          >
            <div className='flex items-center justify-center'>
              &times;&nbsp;{child.quantity}
            </div>
          </ProductListCard>
        ))}
      </div>
    </>
  );
};

export default ProductChildren;

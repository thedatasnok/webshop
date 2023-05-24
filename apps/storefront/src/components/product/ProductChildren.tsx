import { ProductChildDetails } from '@webshop/contracts';
import ProductListCard from './ProductListCard';

export interface ProductChildrenProps {
  children?: ProductChildDetails[];
}

/**
 * Component for displaying the children of a product.
 * Accepts an array of children and displays them in a unordered list.
 */
const ProductChildren: React.FC<ProductChildrenProps> = ({ children }) => {
  if (children === undefined || children.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className='font-title mt-4 text-lg font-semibold uppercase'>
        This pack contains the following:
      </h3>

      <ul className='flex flex-col items-center gap-1'>
        {children.map((child) => (
          <ProductListCard
            key={child.id}
            id={child.id}
            name={child.name}
            image={child.imageUrls[0]}
            to={`/products/${child.id}`}
            shortDescription={child.description}
            hoverEffects
          >
            <div className='flex items-center justify-center'>
              &times;&nbsp;{child.quantity}
            </div>
          </ProductListCard>
        ))}
      </ul>
    </>
  );
};

export default ProductChildren;

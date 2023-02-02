import Header from '@/components/layout/Header';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />

      <p className='text-center'>Product id from URL: {id}</p>
    </div>
  );
};

export default ProductView;

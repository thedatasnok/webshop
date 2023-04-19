import { Testimonial } from '@/static/testimonials';
import { Corner } from '@webshop/ui';

interface TestimonialCardProps extends Testimonial {}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  age,
  name,
  text,
}) => {
  return (
    <div className='border-base-900 clip-corner-br-md mb-4 flex w-64 flex-shrink-0 flex-col justify-between gap-2 rounded-sm border drop-shadow-lg'>
      <div className='relative mx-4 mb-2 mt-4'>
        <Corner
          size='sm'
          sides='top-left'
          className='text-primary-700 absolute -left-1 -top-1'
        />

        <p className='text-base-200 p-2 text-sm font-medium italic'>{text}</p>

        <Corner
          size='sm'
          sides='bottom-right'
          className='text-primary-700 absolute -bottom-1 -right-1'
        />
      </div>
      <div className='bg-base-900/60 border-base-900 flex items-center gap-3 rounded-b-sm border-t px-4 py-3'>
        <img
          src='https://st.depositphotos.com/1809585/4656/i/950/depositphotos_46562679-stock-photo-happy-man-with-white-teeth.jpg'
          alt={'Picture of ' + name}
          className='aspect-square h-10 rounded-full'
        />
        <div>
          <h3 className='font-title text-primary-600 text-lg font-semibold uppercase tracking-wide'>
            {name}, {age}
          </h3>
          <p className='font-title text-base-400 -mt-2 text-xs uppercase'>
            RVW#00318
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

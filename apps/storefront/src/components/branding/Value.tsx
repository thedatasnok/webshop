import { IconType } from 'react-icons';

interface ValueProps {
  icon: IconType;
  text: string;
}

export const Value: React.FC<ValueProps> = ({ icon: Icon, text }) => {
  return (
    <div className='bg-gradient-radial from-primary via-primary-600 to-primary-800 flex w-20 flex-col items-center justify-center bg-clip-text text-transparent'>
      <Icon className='text-primary h-16 w-16' />
      <h2 className='font-title whitespace-nowrap font-bold tracking-wide uppercase'>
        {text}
      </h2>
    </div>
  );
};

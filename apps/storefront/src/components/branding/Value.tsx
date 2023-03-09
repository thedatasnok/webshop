import { IconType } from 'react-icons';

interface ValueProps {
  icon: IconType;
  text: string;
}

export const Value: React.FC<ValueProps> = ({ icon: Icon, text }) => {
  return (
    <div className='text-base-200 flex w-16 flex-col items-center justify-center'>
      <Icon className='h-12 w-12' />
      <p className='font-title text-sm font-semibold uppercase'>{text}</p>
    </div>
  );
};

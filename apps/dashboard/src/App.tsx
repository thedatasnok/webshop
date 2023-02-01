import { Logo } from '@webshop/ui';

const App = () => {
  return (
    <div className='h-screen w-screen bg-base flex flex-col items-center justify-center text-base-50'>
      <Logo variant='big' className='w-96' />
      <p className='text-base-400 font-title italic -ml-11'>
        coming to a browser near you soon...
      </p>
    </div>
  );
};

export default App;

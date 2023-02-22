import PageLayout from '@/components/layout/PageLayout';

const NotFound = () => {
  return (
    <PageLayout>
      <main>
        <div className='flex h-96 flex-col items-center justify-center'>
          <h1 className='font-title flex justify-center text-8xl font-semibold'>
            404
          </h1>
          <p>could not find that page</p>
        </div>
      </main>
    </PageLayout>
  );
};

export default NotFound;

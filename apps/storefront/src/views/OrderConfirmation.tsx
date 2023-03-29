import PageLayout from '@/components/layout/PageLayout';

const OrderConfirmation = () => {
  return (
    <PageLayout>
      <main>
        <div className='mx-auto w-full max-w-screen-xl'>
          <div className='flex justify-center'>
            <h1>
              Order placed
            </h1>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default OrderConfirmation;

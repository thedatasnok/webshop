const UserManagement = () => {
  return (
    <div className='px-4 pt-4'>
      <h1 className='font-title text-xl font-semibold'>Users</h1>

      <div>
        {[...Array(15)].map((_, i) => (
          <div key={i} className='mt-2 flex flex-row items-center'>
            <div className='bg-base-800 h-8 w-8 rounded-full' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

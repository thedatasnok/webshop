import { Button, TextField } from "@webshop/ui";

export interface UserDetailsProps {
  className?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ className }) => {
  return (
    <div>
      <h1 className='mt-4 font-title mb-2 text-3xl font-semibold uppercase'>
        Account Details
      </h1>
      <form id=''>
        <div className='flex flex-col py-1'>
          <label>E-mail</label>
          <TextField />
        </div>

        <div className='flex flex-col py-1'>
          <label>Name</label>
          <TextField />
        </div>
      </form>
      <div id='' className='rounded-sm py-5 text-xl'>
        <Button className='px-4'>Change password</Button>
      </div>
      <h1 className='font-title mt-8 mb-2 text-3xl font-semibold uppercase'>
        Delivery Address
      </h1>
      <form id=''>
        <div className='flex flex-col py-1'>
          <label>Street</label>
          <TextField />
        </div>

        <div className='flex flex-col py-1'>
          <label>City</label>
          <TextField />
        </div>

        <div className='flex flex-col py-1'>
          <label>Postal Code</label>
          <TextField />
        </div>

        <div className='flex flex-col py-1'>
          <label>Country</label>
          <TextField />
        </div>
      </form>
      <div id='' className='flex justify-end rounded-sm py-5 text-xl'>
        <Button className='px-4'>Save</Button>
      </div>
    </div>
  )
}

export default UserDetails;

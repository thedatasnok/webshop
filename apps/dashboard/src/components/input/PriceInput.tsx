interface PriceInputProps {
  id?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: string) => void;
}

/**
 * Custom input component used to input a price as a numeric value.
 */
const PriceInput: React.FC<PriceInputProps> = ({ id, inputProps }) => {
  return (
    <div className='border-base-700 flex w-fit items-center rounded-sm border'>
      <span className='font-title text-primary border-base-700 bg-base-900 border-r px-2 py-1.5 text-xl font-bold'>
        $
      </span>
      <input
        {...inputProps}
        id={id}
        type='number'
        className='border-0 bg-transparent py-2 pl-1 pr-2 focus:border-0 focus:ring-0'
      />
    </div>
  );
};

export default PriceInput;

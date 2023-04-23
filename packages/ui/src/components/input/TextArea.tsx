interface TextAreaProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  areaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/**
 * Text area component.
 */
const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  areaProps,
}) => {
  return (
    <textarea
      {...areaProps}
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className='border-base-600 focus:border-primary block w-full rounded-sm bg-transparent px-2 py-1.5 focus:ring-0'
    />
  );
};

export default TextArea;

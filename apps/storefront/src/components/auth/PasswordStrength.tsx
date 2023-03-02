import clsx from 'clsx';
import { RiCheckFill, RiCloseLine } from 'react-icons/ri';

export interface PasswordRequirement {
  label: string;
  satisfied: boolean;
}

export const PasswordStrengthCodes = [
  'VERY_WEAK',
  'WEAK',
  'REASONABLE',
  'STRONG',
  'VERY_STRONG',
] as const;

export type PasswordStrengthCode = (typeof PasswordStrengthCodes)[number];

export interface PasswordStrengthProps {
  strength: PasswordStrengthCode;
  requirements: PasswordRequirement[];
}

/**
 * Component for displaying the strength of a password, and requirement satisfaction.
 * Uses a strength code to display a meter, and a list of requirements.
 */
const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  strength,
  requirements,
}) => {
  const strengthIndex = PasswordStrengthCodes.indexOf(strength);

  return (
    <div>
      <p className='font-title text-sm font-semibold uppercase'>
        Password strength
      </p>
      <div className='flex gap-1'>
        {PasswordStrengthCodes.map((code, index) => (
          <div
            key={code}
            className={clsx(
              'bg-base-800 h-2 w-1/5',
              index <= strengthIndex && [
                strength === 'VERY_WEAK' && 'bg-error',
                strength === 'WEAK' && 'bg-warn',
                strength === 'REASONABLE' && 'bg-warn',
                strength === 'STRONG' && 'bg-ok',
                strength === 'VERY_STRONG' && 'bg-ok',
              ],
              index === 0 && 'rounded-l-sm',
              index === PasswordStrengthCodes.length - 1 && 'rounded-r-sm'
            )}
          />
        ))}
      </div>
      <ul className='mt-2'>
        {requirements.map((requirement, i) => (
          <li
            key={i + requirement.label}
            className={clsx(
              'flex items-center gap-1',
              requirement.satisfied && 'text-ok',
              !requirement.satisfied && 'text-error'
            )}
          >
            {requirement.satisfied && <RiCheckFill className='h-5 w-5' />}
            {!requirement.satisfied && <RiCloseLine className='h-5 w-5' />}

            <p className='text-sm'>{requirement.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;

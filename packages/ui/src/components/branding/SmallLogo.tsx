import type { LogoVariantProps } from './Logo';

const SmallLogo: React.FC<LogoVariantProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 33.731 7.846'
    >
      <g>
        <path
          d='M80.703 130.018H76.21l-7.846 7.845h8.218l1.13-1.117 1.49-1.502h-3.737l-1.502 1.502h-.745l5.61-5.6h.746l-1.49 1.49h3.737l2.619-2.618zM85.106 130.018l-7.846 7.845h8.218l4.11-4.109H85.85l-.373.373-2.608 2.619h-.756l5.61-5.61h.746l-1.502 1.5h3.737l1.501-1.5 1.118-1.118zM93.877 130.018l-7.846 7.845h8.219l4.109-4.109h-3.737l-.372.373-2.608 2.619h-.757l5.611-5.61h.745l-1.501 1.5h3.736l1.502-1.5 1.117-1.118z'
          fill='currentColor'
          transform='translate(-68.364 -130.018)'
        />
      </g>
    </svg>
  );
};

export default SmallLogo;

import BigLogo from './BigLogo';
import SmallLogo from './SmallLogo';

export interface LogoProps {
  variant: 'big' | 'small';
  className?: string;
}

// excludes the 'variant' property from the LogoProps interface
export type LogoVariantProps = Omit<LogoProps, 'variant'>;

const Logo: React.FC<LogoProps> = ({ variant, className }) => {
  if (variant === 'big') return <BigLogo className={className} />;

  return <SmallLogo className={className} />;
};

export default Logo;

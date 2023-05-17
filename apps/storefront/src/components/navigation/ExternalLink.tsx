import { RiExternalLinkLine } from 'react-icons/ri';

interface ExternalLinkProps {
  /**
   * The link to the external site.
   */
  href: string;
  /**
   * The text to display.
   */
  children: string;
}

/**
 * Component for displaying external links.
 * Links will have a small icon to the left of the text.
 */
const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <a href={href} className='text-primary group hover:underline'>
      <RiExternalLinkLine className='text-base-400 group-hover:text-base-100 mx-px -mt-1 inline transition-all' />
      {children}
    </a>
  );
};

export default ExternalLink;

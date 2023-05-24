interface PageTitleProps {
  title: string;
}

/**
 * Title component for rendering the top-most title of a dashboard page.
 */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className='font-title text-2xl font-semibold uppercase'>{title}</h1>
  );
};

export default PageTitle;

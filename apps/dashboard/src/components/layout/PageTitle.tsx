interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className='font-title text-2xl font-semibold uppercase'>{title}</h1>
  );
};

export default PageTitle;

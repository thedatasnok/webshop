import TestimonialCard from '@/components/branding/TestimonialCard';
import { Value } from '@/components/branding/Value';
import CategoryCard from '@/components/category/CategoryCard';
import PageLayout from '@/components/layout/PageLayout';
import ExternalLink from '@/components/navigation/ExternalLink';
import NavigationCard from '@/components/navigation/NavigationCard';
import ProductCard from '@/components/product/ProductCard';
import { RouteHref } from '@/router';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFeaturedProductsQuery } from '@/services/products';
import { TESTIMONIALS } from '@/static/testimonials';
import { GiOfficeChair, GiProcessor, GiSunglasses } from 'react-icons/gi';
import { RiAlertLine, RiArrowRightLine, RiStore2Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useFeaturedProductsQuery();

  return (
    <PageLayout className='mx-auto flex w-full max-w-screen-xl flex-col'>
      {/* Hero section */}
      <section
        aria-label='hero'
        className='border-base-900 relative flex aspect-[2/1] w-full rounded-md border bg-cover bg-center sm:aspect-[3/1]'
        style={{
          backgroundImage:
            'url(https://cgg-webshop-assets.s3.eu-north-1.amazonaws.com/images/branding/hero.jpg)',
        }}
      >
        <div className='absolute right-0 top-1/2 h-full w-full -translate-y-1/2 flex-col justify-center rounded-r-md bg-gradient-to-r from-transparent via-[#000000]/80 to-[#000000]/80 p-2 px-4 md:w-5/12'>
          <div className='flex h-full flex-col items-center justify-center'>
            <h1 className='font-title text-center text-xl font-bold uppercase sm:text-2xl md:text-3xl'>
              Gaming gear that just makes you faster, stronger and more awesome.
            </h1>

            <NavLink
              to={RouteHref.PRODUCTS}
              className='text-primary-600 mt-4 flex w-fit items-center self-center border-b px-1 pb-1 transition-colors'
            >
              <span className='font-title font-semibold uppercase'>
                Browse our products
              </span>
              <RiArrowRightLine className='h-6 w-6' />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Main content segment */}
      <h2
        id='categories-title'
        className='font-title my-4 text-center text-2xl font-bold uppercase tracking-wider'
      >
        Categories
      </h2>

      <section
        aria-labelledby='categories-title'
        className='overflow-x-scroll pb-2'
      >
        <ul className='mx-auto flex w-fit justify-center gap-4'>
          {categories?.map((category) => (
            <li key={category.id}>
              <NavLink
                to={[RouteHref.PRODUCTS, '?category=', category.id].join('')}
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  iconUrl={category.iconUrl}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      <h2
        id='featured-products-title'
        className='font-title my-4 text-center text-2xl font-bold uppercase tracking-wider'
      >
        Featured products
      </h2>

      <section
        aria-labelledby='featured-products-title'
        className='overflow-x-scroll pb-2'
      >
        <ol className='mx-auto flex w-fit justify-center gap-4'>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              to={[RouteHref.PRODUCTS, product.id].join('/')}
              name={product.name}
              previousPrice={product.previousPrice}
              shortDescription={product.shortDescription}
              isDiscount={product.isDiscount}
              price={product.price}
              image={product.imageUrls[0]}
              className='w-48 flex-shrink-0'
            />
          ))}
          {products && products.length > 1 && (
            <NavigationCard title='browse more' icon={RiStore2Line} />
          )}
        </ol>
      </section>

      <h2
        id='testimonials-title'
        className='font-title mb-4 mt-8 text-center text-2xl font-bold uppercase tracking-wider'
      >
        Testimonials
      </h2>

      <section
        aria-labelledby='testimonials-title'
        className='overflow-x-scroll'
      >
        <ul className='mx-auto flex w-fit justify-center gap-4'>
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </ul>
      </section>

      <h2
        id='about-us-title'
        className='font-title mb-4 mt-8 text-center text-2xl font-bold uppercase tracking-wider'
      >
        About us
      </h2>

      <section
        aria-labelledby='about-us-title'
        className='mx-auto max-w-screen-lg text-center'
      >
        <p className='text-base-300'>
          Welcome to the future of gaming! We are a cutting edge company
          specializing in the most advanced cyberpunk gaming gadgets available.
          From headsets to keyboards, mice to controllers, we have everything
          you need to get the most out of your gaming experience. Our products
          feature the latest in cyberpunk technology, with sleek designs and
          advanced capabilities. Experience the power of cyberpunk gaming with
          us today! Let us take your gaming to the next level.
        </p>

        <div className='mt-8 grid grid-cols-1 place-items-center sm:grid-cols-3'>
          <section className='flex flex-col items-center'>
            <Value icon={GiProcessor} text='High-tech' />
            <p className='text-base-300 text-sm'>
              Cutting-edge products for enhanced gaming.
            </p>
          </section>

          <section className='flex flex-col items-center'>
            <Value icon={GiOfficeChair} text='Comfort' />
            <p className='text-base-300 text-sm'>
              Max comfort with high-quality chairs and accessories.
            </p>
          </section>

          <section className='flex flex-col items-center'>
            <Value icon={GiSunglasses} text='Stylish' />
            <p className='text-base-300 text-sm'>
              Customizable, sleek products to complement your style.
            </p>
          </section>
        </div>
      </section>

      <section
        id='disclaimer'
        className='bg-warn/10 border-warn text-warn mx-auto my-12 flex max-w-screen-lg flex-col items-center gap-2 rounded-sm border p-2 text-center sm:flex-row sm:text-left'
      >
        <RiAlertLine className='h-16 w-16 flex-shrink-0' />

        <div>
          <h2 className='font-title -my-1 text-lg font-bold uppercase tracking-wider'>
            Disclaimer
          </h2>

          <p className='text-sm'>
            This website is a result of a university group project, performed in
            the course{' '}
            <ExternalLink href='https://ntnu.edu/studies/courses/IDATA2301'>
              IDATA2301 Web technologies
            </ExternalLink>
            , at <ExternalLink href='https://ntnu.edu'>NTNU</ExternalLink>. All
            the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default LandingPage;

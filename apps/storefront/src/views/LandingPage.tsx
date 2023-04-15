import TestimonialCard from '@/components/branding/TestimonialCard';
import { Value } from '@/components/branding/Value';
import CategoryCard from '@/components/category/CategoryCard';
import PageLayout from '@/components/layout/PageLayout';
import ExternalLink from '@/components/navigation/ExternalLink';
import ProductCard from '@/components/product/ProductCard';
import { RouteHref } from '@/router';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFeaturedProductsQuery } from '@/services/products';
import { TESTIMONIALS } from '@/static/testimonials';
import { RiArrowRightLine, RiCpuLine, RiStore2Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useFeaturedProductsQuery();

  return (
    <PageLayout>
      <main className='z-20 mx-auto flex w-full max-w-screen-xl flex-col'>
        {/* Hero section */}
        <section
          aria-label='hero'
          className='clip-corner-tl-hero border-base-800 relative flex rounded-r-md rounded-bl-md border'
        >
          <img
            src='https://media.discordapp.net/attachments/1073986585516834826/1095760268006527076/dudleif_the_city_of_alesund_at_night_in_the_year_2077_with_skys_39cf0c9b-2ca5-47d0-ba44-43fc5d02446b_1.png'
            className='border-base-800 aspect-[2/1] w-full sm:aspect-[3/1]'
          />

          <div className='absolute right-0 top-1/2 h-full w-full -translate-y-1/2 flex-col justify-center rounded-r-md bg-gradient-to-r from-transparent via-[#000000]/80 to-[#000000]/80 p-2 px-4 md:w-5/12'>
            <div className='flex h-full flex-col items-center justify-center'>
              <h1 className='font-title text-center text-xl font-bold uppercase sm:text-2xl md:text-3xl'>
                Gaming gear that just makes you faster, stronger and more
                awesome.
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
          className='max-sm:hide-scroll-bar overflow-x-scroll pb-2'
        >
          <div className='mx-auto flex w-fit justify-center gap-4'>
            {categories?.map((category) => (
              <NavLink
                key={category.id}
                to={[RouteHref.PRODUCTS, '?category=', category.id].join('')}
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  iconUrl={category.iconUrl}
                />
              </NavLink>
            ))}
          </div>
        </section>

        <h2
          id='featured-products-title'
          className='font-title mb-4 mt-8 text-center text-2xl font-bold uppercase tracking-wider'
        >
          Featured products
        </h2>

        <section
          aria-labelledby='featured-products-title'
          className='max-sm:hide-scroll-bar overflow-x-scroll pb-2'
        >
          <div className='mx-auto flex w-fit justify-center gap-4'>
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
              <NavLink
                to={RouteHref.PRODUCTS}
                className='border-base-800 bg-base-800/30 hover:bg-primary-900/10 hover:text-primary-600 hover:border-primary-800 flex w-48 flex-col items-center justify-center rounded-sm border'
              >
                <RiStore2Line className='h-16 w-16' />

                <div className='flex items-center'>
                  <span className='font-title font-semibold uppercase'>
                    Browse more
                  </span>
                  <RiArrowRightLine className='h-5 w-5' />
                </div>
              </NavLink>
            )}
          </div>
        </section>

        <h2
          id='testimonials-title'
          className='font-title mb-4 mt-12 text-center text-2xl font-bold uppercase tracking-wider'
        >
          Testimonials
        </h2>

        <section
          aria-labelledby='testimonials-title'
          className='overflow-x-scroll'
        >
          <div className='mx-auto flex w-fit justify-center gap-4'>
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
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
            specializing in the most advanced cyberpunk gaming gadgets
            available. From headsets to keyboards, mice to controllers, we have
            everything you need to get the most out of your gaming experience.
            Our products feature the latest in cyberpunk technology, with sleek
            designs and advanced capabilities. Experience the power of cyberpunk
            gaming with us today! Let us take your gaming to the next level.
          </p>

          <h2 className='font-title mb-4 mt-12 text-center text-xl font-bold uppercase tracking-wider'>
            Our values
          </h2>

          <div className='flex items-center justify-center gap-4'>
            <Value icon={RiCpuLine} text='High-tech' />
            <Value icon={RiCpuLine} text='Comfort' />
            <Value icon={RiCpuLine} text='Stylish' />
          </div>

          <p className='text-base-300 mt-4'>
            At Cyberpunk Gaming Gear, we strive to provide our customers with
            the best gaming experience possible. Our values include high-tech,
            comfortable, and stylish products that are designed to help you get
            the most out of your gaming. We believe in providing the most
            advanced technology and highest quality materials to ensure that our
            customers can enjoy their gaming in comfort and style. Our goal is
            to provide an unbeatable gaming experience that you won't find
            anywhere else.
          </p>
        </section>

        <h2 className='font-title mb-4 mt-16 text-center text-2xl font-bold uppercase tracking-wider'>
          Disclaimer
        </h2>

        <section
          id='disclaimer'
          className='text-base-300 relative mx-auto mb-16 max-w-screen-lg text-center'
        >
          <p>
            This website is a result of a university group project, performed in
            the course{' '}
            <ExternalLink href='https://ntnu.edu/studies/courses/IDATA2301'>
              IDATA2301 Web technologies
            </ExternalLink>
            , at <ExternalLink href='https://ntnu.edu'>NTNU</ExternalLink>. All
            the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </p>

          <p className='mt-4'>
            Product descriptions and image assets used on this site are
            generated using AI.
          </p>
        </section>
      </main>
    </PageLayout>
  );
};

export default LandingPage;

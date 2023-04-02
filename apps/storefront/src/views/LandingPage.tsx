import TestimonialCard from '@/components/branding/TestimonialCard';
import { Value } from '@/components/branding/Value';
import CategoryCard from '@/components/category/CategoryCard';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import ExternalLink from '@/components/navigation/ExternalLink';
import ProductCard from '@/components/product/ProductCard';
import { RouteHref } from '@/router';
import { useGetCategoriesQuery } from '@/services/categories';
import { useFindProductsQuery } from '@/services/products';
import { TESTIMONIALS } from '@/static/testimonials';
import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { RiCpuLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useFindProductsQuery({
    featured: true,
  });

  return (
    <PageLayout excludeHeader>
      {/* 
        This is specific to this page, because of opting with excludeHeader.
        Since we want the header & hero section to overlap, we need to manually add it here.
      */}
      <Header className='absolute z-10 -ml-2 w-full px-2 sm:-ml-4 sm:px-4' />

      <main>
        {/* Hero section is a bit hacky, but it's a one off since it is "below" the header and covers full width */}
        <section aria-label='hero' className='relative h-80'>
          <div
            className={clsx(
              'absolute -z-10 -ml-2 h-full bg-cover sm:-ml-4',
              'w-[calc(100%+16px)] sm:w-[calc(100%+32px)] ' // compensates for the padding in PageLayout
            )}
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80)',
            }}
          >
            <div className='from-base via-base/20 to-base flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b'></div>
          </div>

          <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/4 flex-col items-center gap-2'>
            <h1 className='font-title text-center text-3xl font-bold'>
              Gaming gear that just makes you better,{' '}
              <br className='hidden sm:block' />
              faster, stronger and more awesome.
            </h1>

            <NavLink to={RouteHref.PRODUCTS}>
              <Button className='px-3 font-bold normal-case'>Browse shop</Button>
            </NavLink>
          </div>
        </section>

        {/* Main content segment */}
        <div className='z-20 mx-auto flex w-full max-w-screen-xl flex-col'>
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
                  to={[RouteHref.PRODUCTS, product.id].join('/')}
                  name={product.name}
                  previousPrice={product.previousPrice}
                  shortDescription={product.shortDescription}
                  isDiscount={product.isDiscount}
                  price={product.price}
                  image={product.imageUrls[0]}
                  className='w-40 flex-shrink-0'
                />
              ))}
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
              available. From headsets to keyboards, mice to controllers, we
              have everything you need to get the most out of your gaming
              experience. Our products feature the latest in cyberpunk
              technology, with sleek designs and advanced capabilities.
              Experience the power of cyberpunk gaming with us today! Let us
              take your gaming to the next level.
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
              comfortable, and stylish products that are designed to help you
              get the most out of your gaming. We believe in providing the most
              advanced technology and highest quality materials to ensure that
              our customers can enjoy their gaming in comfort and style. Our
              goal is to provide an unbeatable gaming experience that you won't
              find anywhere else.
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
              This website is a result of a university group project, performed
              in the course{' '}
              <ExternalLink href='https://ntnu.edu/studies/courses/IDATA2301'>
                IDATA2301 Web technologies
              </ExternalLink>
              , at <ExternalLink href='https://ntnu.edu'>NTNU</ExternalLink>.
              All the information provided here is a result of imagination. Any
              resemblance with real companies or products is a coincidence.
            </p>

            <p className='mt-4'>
              Product descriptions and image assets used on this site are
              generated using AI.
            </p>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default LandingPage;

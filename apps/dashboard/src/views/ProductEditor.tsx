import CategoryListCard from '@/components/category/CategoryListCard';
import DiscountSwitch from '@/components/input/DiscountSwitch';
import PriceInput from '@/components/input/PriceInput';
import PageTitle from '@/components/layout/PageTitle';
import ProductSpecificationTable, {
  ProductSpecificationRow,
} from '@/components/product/ProductSpecificationTable';
import ProductFamilyCard from '@/components/productfamily/ProductFamilyCard';
import { RouteHref } from '@/router/enum';
import { useForm } from '@mantine/form';
import { CreateProductRequest } from '@webshop/contracts';
import { Hint, InputLabel, TextArea, TextField } from '@webshop/ui';
import { useState } from 'react';
import {
  RiArrowLeftSLine,
  RiImage2Line,
  RiQuestionLine,
  RiSearchLine,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

/**
 * View for editing the definition of a product.
 */
const ProductEditor = () => {
  const [isDiscount, setIsDiscount] = useState(false);

  const handleSpecificationChange = (
    name: string,
    data: ProductSpecificationRow[]
  ) => {};

  const fileName = undefined;

  const form = useForm<CreateProductRequest>({
    initialValues: {
      name: '',
      shortName: '',
      shortDescription: '',
      isDiscount: false,
      imageUrls: [],
      familyId: null,
      description: '',
      children: {},
      attributes: {},
      price: 0,
      categoryIds: [],
    },
  });

  return (
    <div className='flex h-full flex-col overflow-y-auto px-4 py-4'>
      <NavLink
        className='font-title text-base-400 hover:text-base-300 flex w-fit items-center text-sm font-semibold uppercase transition-colors hover:underline'
        to={RouteHref.PRODUCT_MANAGEMENT}
      >
        <RiArrowLeftSLine className='-ml-1 h-5 w-5' />
        <span>Back to products</span>
      </NavLink>

      <PageTitle title='New product' />

      <div className='grid flex-1 grid-cols-4 gap-4'>
        <section className='col-span-2'>
          <h2 className='font-title text-lg font-semibold uppercase'>
            Product metadata
          </h2>

          <InputLabel htmlFor='name'>Name</InputLabel>
          <TextField id='name' inputProps={form.getInputProps('name')} />

          <InputLabel htmlFor='short-name'>Short name</InputLabel>
          <TextField
            id='short-name'
            inputProps={form.getInputProps('shortName')}
          />

          <InputLabel htmlFor='short-description'>Short description</InputLabel>
          <TextArea
            id='short-description'
            value={form.values.shortDescription ?? ''}
            onChange={(value) => form.setFieldValue('shortDescription', value)}
          />

          <InputLabel htmlFor='description'>Description</InputLabel>
          <TextArea
            id='description'
            value={form.values.description ?? ''}
            onChange={(value) => form.setFieldValue('description', value)}
          />

          <div className='flex flex-col'>
            <InputLabel htmlFor='image'>Image</InputLabel>
            <label htmlFor='image'>
              <div className='border-base-700 flex w-fit items-center rounded-sm border'>
                <div className='border-base-700 bg-base-900 border-r p-1'>
                  <RiImage2Line className='h-6 w-6' />
                </div>
                {fileName ? (
                  <span className='text-base-300 px-1 py-1 text-sm'>
                    {fileName}
                  </span>
                ) : (
                  <span className='text-base-300 px-1 py-1 text-sm'>
                    No file selected
                  </span>
                )}
              </div>
            </label>
            <input type='file' id='image' className='hidden' />
          </div>

          <InputLabel htmlFor='current-price'>Current price</InputLabel>
          <div className='flex items-center gap-2'>
            <PriceInput
              id='current-price'
              inputProps={form.getInputProps('price')}
            />
            <DiscountSwitch value={isDiscount} onChange={setIsDiscount} />
            <InputLabel>Is discounted</InputLabel>
          </div>

          <InputLabel htmlFor='price-guidance'>
            Price guidance (time insensitive)
          </InputLabel>
          <div className='flex items-center'>
            <PriceInput
              id='price-guidance'
              inputProps={form.getInputProps('')}
            />

            <div className='border-base-700 hover:bg-base-900 relative -ml-px rounded-sm border transition-colors'>
              <Hint
                icon={RiQuestionLine}
                className='text-base-300 p-2.5 text-center hover:z-50'
                message='Helps flag price inconsistencies for aggregate products'
              />
            </div>
          </div>
        </section>

        <div className='col-span-2 flex flex-col overflow-hidden'>
          <h2 className='font-title text-lg font-semibold uppercase'>
            Product family
          </h2>
          <TextField
            icon={RiSearchLine}
            placeholder='Search product families...'
          />
          <ul className='flex flex-row gap-2 overflow-x-auto px-1 py-2'>
            {[...Array(10)].map((_, i) => (
              <ProductFamilyCard
                key={i}
                id={i}
                name='NovaStrike Ultimate'
                description='The ultimate gaming mouse for the ultimate gamer, with built-in hyperdrive.'
                productCount={3}
                selected={form.values.familyId === i}
                onClick={() => form.setFieldValue('familyId', i)}
              />
            ))}
          </ul>

          <h2 className='font-title mt-4 text-lg font-semibold uppercase'>
            Categories
          </h2>
          <TextField icon={RiSearchLine} placeholder='Search categories...' />
          <ul className='grid grid-cols-2 gap-2 overflow-x-auto px-1 py-2'>
            {[...Array(8)].map((_, i) => (
              <CategoryListCard
                id={i}
                key={i}
                name='Console'
                iconUrl='https://cgg-webshop-assets.s3.eu-north-1.amazonaws.com/images/icons/consoles.svg'
                selected={form.values.categoryIds.includes(i)}
                onClick={() =>
                  form.setFieldValue('categoryIds', [
                    ...form.values.categoryIds,
                    i,
                  ])
                }
              />
            ))}
          </ul>
        </div>

        <div className='col-span-4 h-fit'>
          <h2 className='font-title text-lg font-semibold uppercase'>
            Product specifications
          </h2>

          <div className='grid grid-cols-3 gap-2'>
            <ProductSpecificationTable
              key='1'
              name='Size'
              rows={[
                { locked: true, name: 'Height', value: '3kg' },
                { locked: false, name: 'Weight', value: '3kg' },
              ]}
              onChange={handleSpecificationChange}
            />
            <ProductSpecificationTable
              name='Size'
              namelock
              rows={[
                { locked: true, name: 'Height', value: '3kg' },
                { locked: false, name: 'Weight', value: '3kg' },
              ]}
              onChange={handleSpecificationChange}
            />
            <ProductSpecificationTable
              name='Size'
              namelock
              rows={[
                { locked: true, name: 'Height', value: '3kg' },
                { locked: false, name: 'Weight', value: '3kg' },
              ]}
              onChange={handleSpecificationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;

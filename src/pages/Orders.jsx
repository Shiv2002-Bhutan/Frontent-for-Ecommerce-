import React from 'react';
import Title from '../components/Title';
import { products } from '../assets/assets';

const Orders = () => {
  return (
    <div className='border-t pt-16 px-4 sm:px-10'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      <div className='flex flex-col gap-6'>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* Product Info Section */}
            <div className='flex items-start gap-6 text-sm'>
              <img
                src={item.image[0]}
                className='w-16 sm:w-20 object-cover rounded'
                alt={item.name}
              />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-4 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>NU {item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className='mt-2'>
                  Date: <span className='text-gray-400'>13 March</span>
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className='flex items-center gap-3 pl-2 md:pl-0'>
              <div className='w-2 h-2 rounded-full bg-green-500' />
              <p className='text-sm md:text-base'>Ready for Shipping</p>
            </div>
             <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

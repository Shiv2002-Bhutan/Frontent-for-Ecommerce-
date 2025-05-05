import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems'; // Ensure this component is correctly imported

const LatestCollections = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]); // Add 'products' as a dependency to ensure it updates when products change

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={"Collections"} />
                <p className='w-3/4 m-auto text-xs sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
            </div>
            
            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((product, index) => (
            <ProductItems key={index} id={product._id} image={product.image} price={product.price} name={product.name}/>
                ))}
            </div>
        </div>
    );
};

export default LatestCollections;

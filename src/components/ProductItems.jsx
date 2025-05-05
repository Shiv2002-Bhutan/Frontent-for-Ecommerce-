import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                {image && image.length > 0 ? (
                    <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt={name || "Product Image"} />
                ) : (
                    <div className='bg-gray-200 w-full h-40 flex items-center justify-center text-gray-500'>
                        No Image Available
                    </div>
                )}
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>Nu.{price}</p>
        </Link>
    );
};

export default ProductItems;

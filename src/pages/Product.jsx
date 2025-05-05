import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../assets/assets"; // Correct the import path here
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  
  
  const { id: productId } = useParams(); // Get productId from URL params
  const {products,currency,addToCart} =useContext(ShopContext)
  const [productData, setProductData] = useState(null); // State to store product data
  const [image, setImage] = useState(''); // State to store the image
  const[size,setSize]=useState('')
  useEffect(() => {
    // Find the product with the matching ID from the products array
    const product = products.find(item => item._id === productId);

    if (product) {
      setProductData(product); // Set the product data in state
      setImage(product.image[0]); // Set the first image of the product
    }
  }, [productId]); // Re-run effect when the productId changes

  // Render a loading message until the product data is fetched
  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)}
                  src={item} 
                  key={index} 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt={productData.name}
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
          <img src={image}  className='w-full h-auto'alt="" />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h2 className='text-xl font-semibold'>{productData.name}</h2>
          <p className='text-sm mt-4 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex justify-between mt-4'>
            <span className='text-xl font-medium'>NU. {productData.price} </span>
          </div>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
  {
    productData.sizes.map((item, index) => (
      <button
        onClick={() => setSize(item)}
        className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-black' : ''}`}
        key={index}
      >
        {item}
      </button>
    ))
  }
</div>
<button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add to Cart</button>

          </div>
          <hr className="mt-8 w-3/4"/>
        </div>
      </div>
    </div>
  );
};

export default Product;

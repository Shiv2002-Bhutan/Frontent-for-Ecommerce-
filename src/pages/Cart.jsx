import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartProduct from '../components/CartProduct';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    addToCart,
    setCartItems,
    getCartCount,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (itemId, size, value) => {
    const newQty = parseInt(value);
    if (isNaN(newQty) || newQty < 1) return;

    const currentQty = cartItems[itemId]?.[size] || 0;
    const diff = newQty - currentQty;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        addToCart(itemId, size);
      }
    } else {
      for (let i = 0; i < Math.abs(diff); i++) {
        removeFromCart(itemId, size);
      }
    }
  };


  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          const productImage = Array.isArray(productData?.image)
            ? productData.image[0]
            : productData?.image;

          return (
            <div key={index} className="flex items-center justify-between gap-4 border-b pb-4">
              {/* Left: Image + Info */}
              <div className="flex items-center gap-5">
                <img
                  src={productImage}
                  alt={productData?.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="font-small text-gray-800">{productData?.name}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm font-medium text-gray-700">
                    Price: {currency}{productData?.price}
                  </p>
                </div>
              </div>

              {/* Middle: Quantity Input */}
              <input
                type="number"
                min="1"
                className="w-16 text-center border border-gray-300 rounded-md py-1 text-sm"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
              />

              {/* Right: Remove */}
              <button
                onClick={() => removeFromCart(item._id, item.size)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          );
        })}

        {/* Totals and Place Order */}
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartProduct />
            <button
              onClick={()=>{navigate('/place-order')}}
              className="w-full mt-6  bg-black hover:bg-gray-700 text-white font-medium py-2 px-4 -md transition-all"
            >
            PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

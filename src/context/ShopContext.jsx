import { createContext, useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "NU.";
  const deliveryCharge = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate=useNavigate()

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Product Size Not Selected");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
  };

  const removeFromCart = (itemId, size) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId] && updatedCart[itemId][size]) {
      delete updatedCart[itemId][size];

      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }

      setCartItems(updatedCart);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    Object.values(cartItems).forEach(sizes =>
      Object.values(sizes).forEach(count => {
        if (count > 0) totalCount += count;
      })
    );
    return totalCount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(product => product._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee: deliveryCharge,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getTotalAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

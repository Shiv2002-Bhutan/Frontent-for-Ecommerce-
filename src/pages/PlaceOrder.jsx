import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartProduct from '../components/CartProduct';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { name, email, phone, address1, city, postalCode } = form;

    if (!name || !email || !phone || !address1 || !city || !postalCode || !paymentMethod) {
      toast.error('Please fill in all required fields and select a payment method.');
      return;
    }

    if (paymentMethod === 'PAY NOW') {
      const options = {
        key: 'rzp_test_YourKeyHere', 
        amount: 50000, 
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Order Payment',
        handler: function (response) {
          toast.success('Payment successful!');
          navigate('/orders');
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: `${form.address1}, ${form.address2}, ${form.city}, ${form.postalCode}`,
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.success('Order placed. Pay on delivery.');
      navigate('/orders');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10'>
      {/* Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>

        <form className='flex flex-col gap-3'>
          <input type='text' name='name' value={form.name} onChange={handleChange} placeholder='Full Name' className='border p-2 rounded-md' />
          <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email Address' className='border p-2 rounded-md' />
          <input type='number' name='phone' value={form.phone} onChange={handleChange} placeholder='Phone Number' className='border p-2 rounded-md' />
          <input type='text' name='address1' value={form.address1} onChange={handleChange} placeholder='Address Line 1' className='border p-2 rounded-md' />
          <input type='text' name='address2' value={form.address2} onChange={handleChange} placeholder='Address Line 2 (optional)' className='border p-2 rounded-md' />
          <div className='flex gap-3'>
            <input type='text' name='city' value={form.city} onChange={handleChange} placeholder='City' className='border p-2 rounded-md w-full' />
            <input type='number' name='postalCode' value={form.postalCode} onChange={handleChange} placeholder='Postal Code' className='border p-2 rounded-md w-full' />
          </div>
        </form>
      </div>

      
      <div className='mt-8 w-full sm:w-[450px]'>
        <CartProduct />

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Methods'} />
          <div className='flex flex-col gap-4 mt-3'>
            <button
              type='button'
              className={`border p-3 rounded-md text-left ${paymentMethod === 'PAY NOW' ? 'border-black' : 'border-gray-300'}`}
              onClick={() => setPaymentMethod('PAY NOW')}
            >
              PAY NOW (via Razorpay)
            </button>
            <button
              type='button'
              className={`border p-3 rounded-md text-left ${paymentMethod === 'PAY ON DELIVERY' ? 'border-black' : 'border-gray-300'}`}
              onClick={() => setPaymentMethod('PAY ON DELIVERY')}
            >
              PAY ON DELIVERY
            </button>
          </div>
        </div>

        <button
          type='button'
          onClick={handlePlaceOrder}
          className='w-full mt-8 bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-all'
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;

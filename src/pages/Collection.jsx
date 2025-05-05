import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext)

  const [filterProducts, setFilterProducts] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('featured')

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const applyFilter = () => {
    let productsCopy = products.slice()
    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))

    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    // Apply sorting after filtering
    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price)
    }

    setFilterProducts(productsCopy)
  }

  const handleSortChange = (e) => {
    setSortType(e.target.value)
  }

  // Re-apply filter whenever category, subCategory, or sortType changes
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, sortType,search,showSearch])

  // Initialize products
  useEffect(() => {
    if (products && Array.isArray(products)) {
      setFilterProducts(products)
    }
  }, [products])

  return (
    <div className='flex flex-col sm:flex-row gap-10 sm:gap-10 pt-10 border-t'>
      {/* FILTER OPTIONS */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className='flex gap-2'>
                <input className='w-3' type='checkbox' value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className='flex gap-2'>
                <input className='w-3' type='checkbox' value={type} onChange={toggleSubCategory} />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS SIDE */}
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select className='border-2 border-gray-300 text-sm px-2' value={sortType} onChange={handleSortChange}>
            <option value='featured'>Sort by: Featured</option>
            <option value='low-high'>Sort by: Price: Low to High</option>
            <option value='high-low'>Sort by: Price: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts?.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection

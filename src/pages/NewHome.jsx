import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'


const NewHome = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <Bestseller/>
      <OurPolicy/>
      <NewsLetterBox/>
     
      
    </div>
  )
}

export default NewHome

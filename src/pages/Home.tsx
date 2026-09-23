import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import PromoBanner from '../components/home/PromoBanner';
import BestSellers from '../components/home/BestSellers';
import WhyNexora from '../components/home/WhyNexora';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <BestSellers />
      <WhyNexora />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;

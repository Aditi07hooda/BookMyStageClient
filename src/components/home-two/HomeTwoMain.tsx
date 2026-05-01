import React from 'react';
import HeroSectionTwo from './HeroSectionTwo';
import FeatureSection from './FeatureSection';
import BannerSection from './BannerSection';
import ProductSliderTwo from './ProductSliderTwo';
import CategorySection from './CategorySection';
import TrendingProducts from './TrendingProducts';
import BrandSlider from './BrandSlider';
import BlogSection from '../home-three/BlogSection';
import ChooseSection from '../home/ChooseSection';
import YoutubeVideoSlider from '../youtube/YoutubeVideoSlider';

const HomeTwoMain = () => {
    return (
        <>
            <HeroSectionTwo/>
            <FeatureSection/>
            <BannerSection/>
            <ProductSliderTwo/>
            {/* <ProductSliderTwo/>
            <ProductSliderTwo/>  */}
            <CategorySection/>
            <TrendingProducts/>
            {/* <BrandSlider/> */}
            <ChooseSection />
            <BlogSection/>
            <YoutubeVideoSlider />
        </>
    );
};

export default HomeTwoMain;
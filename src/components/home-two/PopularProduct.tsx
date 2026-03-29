import Link from 'next/link';
import React from 'react';
import productList from '../../data/products';
import TopRatedProduct from './subComponent/TopRatedProduct';
import Popular from './subComponent/Popular';
import thumb from "../../../public/assets/img/GeneralCards/3.jpg"
import Image from 'next/image';
const PopularProduct = () => {
    return (
        <div className="bd__populer-wrapper">
            {productList &&
                <div className="row">
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6">
                        {/* top rated product */}
                        <TopRatedProduct/>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6">
                        <Popular/>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-8">
                        <Link href="/performances">
                            <div className="bd-flash___banner-item mb-30 p-relative">
                                <div className="bd-flash__banner-thumb w-img">
                                    <Image style={{ width: "100%", height: "auto" }} src={thumb} alt="flash-banner" />
                                </div>
                                <div className="bd-flash__banner-content">
                                    <h4>Evaluation Report</h4>
                                    <h3>Verify & Share</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default PopularProduct;
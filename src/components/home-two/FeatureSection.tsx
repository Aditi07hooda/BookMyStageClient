import FeatureIconFour from '@/sheardComponent/elements/icons/feature-icon-four';
import FeatureIconOne from '@/sheardComponent/elements/icons/feature-icon-one';
import FeatureIconThree from '@/sheardComponent/elements/icons/feature-icon-three';
import FeatureIconTwo from '@/sheardComponent/elements/icons/feature-icon-two';
import Link from 'next/link';
import React from 'react';


const FeatureSection = () => {
    return (
        <section className="bd-features__area pt-70 pb-40">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                🎯
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Expert Evaluation</Link></h4>
                                <span>By Experienced Jury Members</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                📜
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Digital Certificate</Link></h4>
                                <span>Shareable & Verifiable</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                🏆
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Recognition & Awards</Link></h4>
                                <span>Top Performers Get Trophies</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                🔒
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Safe & Secure Platform</Link></h4>
                                <span>Child-Friendly & Trusted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
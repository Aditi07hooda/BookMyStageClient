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
                            <div className="bd-features__content text-center">
                                <h4><Link href="/performances">Evaluation Report</Link></h4>
                                <span>From Experienced Juries</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                📜
                            </div>
                            <div className="bd-features__content text-center">
                                <h4><Link href="/performances">Digital Certificate</Link></h4>
                                <span>Shareable & Verifiable</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                🏆
                            </div>
                            <div className="bd-features__content text-center">
                                <h4><Link href="/performances">Awards</Link></h4>
                                <span>For Top Performers</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                🔒
                            </div>
                            <div className="bd-features__content text-center">
                                <h4><Link href="/performances">Safe & Secure</Link></h4>
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

import Link from 'next/link';
import React from 'react';
import thumb from "../../../../public/assets/img/trending/flash/flash-banner-01.jpg"
import Image from 'next/image';
const FlashBanner = () => {
    return (
        <div className="col-xl-12 col-lg-12">
            <Link href="/shop">
                <div className="bd-flash___banner-item mb-30 p-relative">
                    <div className="bd-flash__banner-thumb w-img">
                        <Image src={thumb} alt="flash-banner" />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FlashBanner;
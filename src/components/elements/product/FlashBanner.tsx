import Link from "next/link";
import React from "react";
import bannerImg from "../../../../public/assets/img/GeneralCards/2.jpg";
import Image from "next/image";
const FlashBanner = () => {
  return (
    <>
      <div className="col-xl-12 col-lg-12">
        <Link href="/performances">
          <div className="bd-flash___banner-item mb-30 p-relative">
            <div className="bd-flash__banner-thumb w-img">
              <Image
                src={bannerImg}
                width={500}
                height={500}
                style={{ width: "100%", height: "auto" }}
                alt="flash-banner"
              />
            </div>
            <div className="bd-flash__banner-content">
              <h4>Recognize</h4>
              <h3>Award & Certificate</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FlashBanner;

"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { YOUTUBE_VIDEOS } from "@/data/youtubeVideos";

import "swiper/css";
import "swiper/css/navigation";

import VideoCard, { VideoItem } from "./VideoCard";

interface YoutubeSliderProps {
  videos?: VideoItem[];
  title?: string;
  subtitle?: string;
}

const YoutubeVideoSlider: React.FC<YoutubeSliderProps> = ({
  videos = YOUTUBE_VIDEOS,
  title = "Trending Videos",
  subtitle = "Watch the most popular content right now",
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const handleModalClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container">
      <section className="w-full bg-zinc-950 py-16 px-4 md:px-8 relative">
        {/* 🔥 Edge Fade Effect */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        {/* ── Header ── */}
        <div className="max-w-screen-xl mx-auto mb-10 flex items-center justify-between">
          <div className="bd-section__title-wrapper text-center mb-55">
            <span className="bd-sub__title">{subtitle}</span>
            <h2 className="bd-section__title mb-30">{title}</h2>
          </div>
        </div>

        <div className="bd-trending__tab-wrapper mb-55 p-relative">
          <div className="bd-trending__navigation">
            <button className="trending-button-preva">
              <i className="fa-regular fa-angle-left"></i>
            </button>
            <button className="trending-button-nexta">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          </div>
        </div>

        {/* ── Slider ── */}
        <div className="max-w-screen-xl mx-auto relative">
          <div className="bd-trending__item-wrapper">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-tab-1"
                role="tabpanel"
                aria-labelledby="nav-tab-1-tab"
              >
                <div className="bd-trending-active1">
                  <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    spaceBetween={20}
                    loop
                    grabCursor
                    observer
                    observeParents
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    navigation={{
                      nextEl: ".trending-button-nexta",
                      prevEl: ".trending-button-preva",
                    }}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      480: { slidesPerView: 1.2 },
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                      1280: { slidesPerView: 4 },
                    }}
                  >
                    {videos.length > 0 ? (
                      videos.map((video) => (
                        <SwiperSlide key={video.id}>
                          <VideoCard
                            video={video}
                            setSelectedVideo={setSelectedVideo}
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <div className="flex items-center justify-center h-40 text-zinc-500">
                          No videos available
                        </div>
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="videoModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedVideo?.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                ></button>
              </div>

              <div className="modal-body p-0">
                {selectedVideo && (
                  <iframe
                    className="w-100"
                    style={{ height: "400px" }}
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YoutubeVideoSlider;

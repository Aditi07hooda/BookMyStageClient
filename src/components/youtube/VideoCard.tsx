"use client";

import Image from "next/image";

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
}

const VideoCard = ({
  video,
  setSelectedVideo,
}: {
  video: VideoItem;
  setSelectedVideo: (video: VideoItem) => void;
}) => {
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="bd-trending__item text-center mb-30">
      
      {/* Thumbnail */}
      <div className="bd-trending__product-thumb position-relative group">
        <Image
          src={thumbnail}
          alt={video.title}
          width={500}
          height={300}
          style={{ width: "100%", height: "auto" }}
        />

        {/* Play Button */}
        <button
          onClick={() => setSelectedVideo(video)}
          data-bs-toggle="modal"
          data-bs-target="#videoModal"
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center border-0 bg-transparent"
        >
          <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
               style={{ width: "50px", height: "50px" }}>
            ▶
          </div>
        </button>

        {/* Duration */}
        <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 small rounded">
          {video.duration}
        </span>
      </div>

      {/* Content */}
      <div className="bd-teanding__content">
        <h4 className="bd-product__title">{video.title}</h4>
        <div className="text-muted small">{video.channel}</div>
        <div className="bd-product__price">
          <span className="bd-product__new-price">
            {video.views} views
          </span>
        </div>
      </div>

      {/* Tag */}
      <div className="bd-product__tag">
        <span className="tag-text danger-bg">Trending</span>
      </div>
    </div>
  );
};

export default VideoCard;
import React from 'react'
import { VideoItem } from "./VideoCard";

interface YoutubeModalProps {
  selectedVideo: VideoItem | null;
  handleModalClose: () => void;
}

const YoutubeModal: React.FC<YoutubeModalProps> = ({
  selectedVideo,
  handleModalClose,
}) => {
  return (
    <>
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
    </>
  )
}

export default YoutubeModal

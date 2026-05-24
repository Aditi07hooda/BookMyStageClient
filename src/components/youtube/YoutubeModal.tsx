"use client";

import React from "react";
import Modal from "react-bootstrap/Modal";
import { VideoItem } from "./VideoCard";

interface YoutubeModalProps {
  show: boolean;
  selectedVideo: VideoItem | null;
  handleModalClose: () => void;
}

const YoutubeModal: React.FC<YoutubeModalProps> = ({
  show,
  selectedVideo,
  handleModalClose,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedVideo?.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        {selectedVideo && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default YoutubeModal;
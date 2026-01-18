"use client";
import React, { useState } from "react";

interface UploadVideoProps {
  onSubmit: (video: File) => void;
}

const VideoUpload: React.FC<UploadVideoProps> = ({ onSubmit }) => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedVideo(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!selectedVideo) return;
    onSubmit(selectedVideo);
    setIsUploaded(true);
  };

  return (
    <div
      style={{
        background: "#e9f5ff", // light blue background
        padding: "25px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "520px",
        margin: "0 auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "18px",
          color: "#0077cc",
          fontWeight: 600,
        }}
      >
        Upload Your Video
      </h3>

      <div className="video-guidelines p-4 mt-4 border rounded">
        <h5 className="fw-bold mb-3">🎥 Video Submission Guidelines</h5>

        <ul className="list-unstyled mb-3">
          <li className="mb-2">
            • <strong>Orientation:</strong> Record in 9:16 (vertical) for best
            results (16:9 allowed if needed).
          </li>
          <li className="mb-2">
            • <strong>Duration:</strong> Maximum 3 minutes only.
          </li>
          <li className="mb-2">
            • <strong>Setup:</strong> Keep the camera stable. No movement or
            zooming.
          </li>
          <li className="mb-2">
            • <strong>Participant:</strong> Only the registered participant
            should appear.
          </li>
          <li className="mb-2">
            • <strong>Format:</strong> Upload video in MP4 format only.
          </li>
          <li className="mb-2">
            • <strong>Entries:</strong> Multiple entries allowed with separate
            registrations.
          </li>
          <li className="mb-2">
            • <strong>Content:</strong> Must be appropriate and unedited.
          </li>
        </ul>

        <p className="mt-3 fw-semibold">
          📌 Videos are officially presented with a standard intro and outro.
        </p>
      </div>

      {/* Video Preview */}
      {previewUrl && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          <video
            src={previewUrl}
            controls
            style={{
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              width: "100%",
              maxWidth: "420px",
              maxHeight: "320px",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* File Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="file"
          accept="video/*"
          disabled={isUploaded}
          onChange={handleVideoChange}
          style={{
            background: "#fff",
            padding: "10px",
            width: "85%",
            borderRadius: "10px",
            border: "1px solid #bcd9f0",
            cursor: isUploaded ? "not-allowed" : "pointer",
          }}
        />
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 40px",
            fontSize: "16px",
            background: isUploaded ? "#9bbcd4" : "#008CFF",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: isUploaded ? "not-allowed" : "pointer",
            fontWeight: 500,
            transition: "0.2s ease",
          }}
        >
          {isUploaded ? "Uploaded" : "Submit Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;

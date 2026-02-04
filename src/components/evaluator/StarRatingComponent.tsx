"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "80rem",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap" as "wrap",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  eventButton: {
    padding: "0.5rem 1.5rem",
    borderRadius: "9999px",
    transition: "all 0.2s",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
    backgroundColor: "white",
  },
  activeEventButton: {
    // backgroundColor: '#699C47',
    backgroundColor: "#19b3e2",
    color: "white",
    transform: "scale(1.05)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    padding: "0.75rem 1rem",
    textAlign: "left" as const,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#111827",
  },
  tableCell: {
    padding: "0.75rem 1rem",
    borderTop: "1px solid #e5e7eb",
  },
  submitButton: {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
  },
  submittedButton: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  activeSubmitButton: {
    backgroundColor: "#2563eb",
    color: "white",
  },
  starButton: {
    padding: "0.25rem",
    cursor: "pointer",
    transition: "transform 0.2s",
    background: "none",
    border: "none",
    position: "relative",
  },
  disabledStar: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  videoButton: {
    color: "#2563eb",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  },
  criteriaContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #e5e7eb",
    resize: "none",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  disabledTextarea: {
    backgroundColor: "#f9fafb",
    cursor: "not-allowed",
  },
  tooltip: {
    position: "absolute" as const,
    top: "-28px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "11px",
    padding: "3px 6px",
    borderRadius: "4px",
    whiteSpace: "nowrap" as const,
    pointerEvents: "none" as const,
    zIndex: 10,
  },
};

export const StarRating = ({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const getRatingLabel = (rating: number) => {
    if (rating <= 1) return "Needs significant improvement";
    if (rating <= 3) return "Average / developing performance";
    if (rating === 4) return "Strong performance";
    if (rating >= 4.5) return "Outstanding performance";
    return "";
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number,
  ) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      setHoverValue(starIndex - (isLeftHalf ? 0.5 : 0));
      setHoveredStar(starIndex);
    }
  };

  const handleClick = (
    starIndex: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      const clickedValue = starIndex - (isLeftHalf ? 0.5 : 0);
      onChange(clickedValue);
      setHoverValue(null);
      setHoveredStar(null);
    }
  };

  const renderStar = (starIndex: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isFullStar = displayValue >= starIndex;
    const isHalfStar = !isFullStar && displayValue >= starIndex - 0.5;

    const currentValue = hoverValue !== null ? hoverValue : value;
    const tooltipText = getRatingLabel(currentValue);
    const showTooltip = hoveredStar === starIndex;

    return (
      <button
        key={starIndex}
        onClick={(e) => handleClick(starIndex, e)}
        onMouseMove={(e) => handleMouseMove(e, starIndex)}
        onMouseLeave={() => {
          setHoverValue(null);
          setHoveredStar(null);
        }}
        style={{
          ...styles.starButton,
          ...(disabled ? styles.disabledStar : {}),
          color: isFullStar || isHalfStar ? "#facc15" : "#d1d5db",
          position: "relative",
        }}
      >
        {hoverValue !== null && showTooltip && (
          <span style={styles.tooltip}>{tooltipText}</span>
        )}

        <Star
          size={24}
          style={{
            fill: isFullStar ? "currentColor" : "none",
            stroke: "currentColor",
          }}
        />
        {isHalfStar && (
          <Star
            size={24}
            style={{
              position: "absolute",
              left: 0,
              fill: "currentColor",
              clipPath: "inset(0 50% 0 0)",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

import React, { useState } from 'react';

const Highlighter = ({ pdfFile, onHighlight }) => {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlight, setHighlight] = useState({});

  const handleMouseDown = (event) => {
    setIsHighlighting(true);
    const boundingRect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    setHighlight({
      startX: offsetX,
      startY: offsetY,
      endX: offsetX,
      endY: offsetY,
    });
  };

  const handleMouseMove = (event) => {
    if (!isHighlighting) return;
    const boundingRect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    setHighlight((prevHighlight) => ({
      ...prevHighlight,
      endX: offsetX,
      endY: offsetY,
    }));
  };

  const handleMouseUp = () => {
    setIsHighlighting(false);
    onHighlight(highlight);
    setHighlight({});
  };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isHighlighting && (
        <div
          style={{
            position: 'absolute',
            border: '1px solid red',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            left: `${Math.min(highlight.startX, highlight.endX)}px`,
            top: `${Math.min(highlight.startY, highlight.endY)}px`,
            width: `${Math.abs(highlight.endX - highlight.startX)}px`,
            height: `${Math.abs(highlight.endY - highlight.startY)}px`,
          }}
        />
      )}
    </div>
  );
};

export default Highlighter;

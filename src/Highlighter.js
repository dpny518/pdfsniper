import React, { useState } from 'react';

const Highlighter = ({ pdfFile, onHighlight }) => {
  const [highlight, setHighlight] = useState(null);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    const rect = event.target.getBoundingClientRect();
    setHighlight({
      x: clientX - rect.left,
      y: clientY - rect.top,
      width: 0,
      height: 0
    });
  };

  const handleMouseMove = (event) => {
    if (highlight) {
      const { clientX, clientY } = event;
      const rect = event.target.getBoundingClientRect();
      setHighlight(prevHighlight => ({
        ...prevHighlight,
        width: clientX - rect.left - prevHighlight.x,
        height: clientY - rect.top - prevHighlight.y
      }));
    }
  };

  const handleMouseUp = () => {
    if (highlight && highlight.width > 0 && highlight.height > 0) {
      onHighlight({
        coordinates: {
          x: highlight.x,
          y: highlight.y,
          width: highlight.width,
          height: highlight.height
        }
      });
    }
    // Do not clear the highlight state here
  };

  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {highlight && (
        <div
          style={{
            position: 'absolute',
            border: '1px dashed red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            top: highlight.y,
            left: highlight.x,
            width: highlight.width,
            height: highlight.height
          }}
        />
      )}
    </div>
  );
};

export default Highlighter;

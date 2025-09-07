import React from 'react';

export default function CradleLoader({ size = 'sm', color = 'white' }) {
  const sizeMap = {
    sm: 30,
    md: 40,
    lg: 50,
    xl: 60,
  };

  const dotSize = sizeMap[size] / 5;

  return (
    <div
      className="relative flex items-center justify-center gap-x-2"
      style={{ width: sizeMap[size], height: sizeMap[size] }}
    >
      <style>
        {`
          @keyframes swing {
            0% { transform: rotate(0deg); animation-timing-function: ease-out; }
            25% { transform: rotate(70deg); animation-timing-function: ease-in; }
            50% { transform: rotate(0deg); animation-timing-function: linear; }
          }
          @keyframes swing2 {
            0% { transform: rotate(0deg); animation-timing-function: linear; }
            50% { transform: rotate(0deg); animation-timing-function: ease-out; }
            75% { transform: rotate(-70deg); animation-timing-function: ease-in; }
          }
        `}
      </style>

      {/* Dot 1 (swing) */}
      <div
        className="relative flex items-center h-full origin-top"
        style={{ animation: 'swing 1.2s linear infinite' }}
      >
        <div
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
        />
      </div>

      {/* Dot 2 */}
      <div className="relative flex items-center h-full origin-top">
        <div
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
        />
      </div>

      {/* Dot 3 */}
      <div className="relative flex items-center h-full origin-top">
        <div
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
        />
      </div>

      {/* Dot 4 (swing2) */}
      <div
        className="relative flex items-center h-full origin-top"
        style={{ animation: 'swing2 1.2s linear infinite' }}
      >
        <div
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

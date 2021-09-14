import { CSSProperties, useEffect, useState } from 'react';

type SpinnerSize = 16 | 32 | 40;

interface LoadingSpinnerProps {
  style?: CSSProperties,
  size: SpinnerSize
}

export default function LoadingSpinner({ style = {}, size = 32 }: LoadingSpinnerProps) {
  return (
    <div className="m-2 overflow-hidden" style={style}>
      <div
        style={{ borderTopColor: 'transparent'}}
        className={`w-${size} h-${size} border-4 border-gray-600 border-dotted rounded-full animate-spin`}
      ></div>
    </div>
  );
}
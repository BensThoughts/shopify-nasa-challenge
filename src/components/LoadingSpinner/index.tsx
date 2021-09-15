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
        className={`w-16 h-16 border-4 border-primary border-dotted rounded-full animate-spin`}
      ></div>
    </div>
  );
}
import { MouseEvent } from 'react';

type ButtonProps = {
  children: string;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  ariaLabel: string;
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick} className={`bg-secondary text-primary text-gray font-bold py-2 px-4 rounded inline-flex items-center ${className}`}>
      {children}
    </button>
  )
}
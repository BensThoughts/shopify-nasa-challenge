type IconButtonProps = {
  children: React.ReactNode;
  onClick: any;
  className: string;
  ariaLabel: string;
}

export default function IconButton({
  className,
  children,
  onClick,
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`bg-gray-500 font-bold py-2 px-4 rounded inline-flex items-center ${className}`}
    >
      {children}
    </button>
  );
}

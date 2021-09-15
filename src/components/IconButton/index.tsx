type IconButtonProps = {
  children: React.ReactNode;
  onClick: any;
  className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={`bg-secondary font-bold py-2 px-4 rounded inline-flex items-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

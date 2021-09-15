type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bg-secondary text-primary font-bold py-2 px-4 rounded inline-flex items-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

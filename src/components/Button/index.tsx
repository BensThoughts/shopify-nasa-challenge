type ButtonProps = {
  children: string;
  onClick: any;
  className?: string;
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`bg-secondary font-bold py-2 px-4 rounded inline-flex items-center ${className}`}>
      {children}
    </button>
  )
}
type SpinnerSize = 16 | 32 | 40;

interface LoadingSpinnerProps {
  size: SpinnerSize
}

export default function LoadingSpinner({
  size = 32,
  ...rest
}: LoadingSpinnerProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="m-2 overflow-hidden" {...rest}>
      <div
        style={{borderTopColor: 'transparent'}}
        className={`w-16 h-16 border-4 border-primary border-dotted rounded-full animate-spin`}
      ></div>
    </div>
  );
}

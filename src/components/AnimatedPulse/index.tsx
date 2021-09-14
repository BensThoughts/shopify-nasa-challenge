export default function AnimatedPulse() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 h-full w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-400 rounded"></div>
          <div className="h-4 bg-blue-400 rounded"></div>
          <div className="h-4 bg-blue-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}
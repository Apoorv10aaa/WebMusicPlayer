function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
    </div>
  );
}

export default LoadingIndicator;

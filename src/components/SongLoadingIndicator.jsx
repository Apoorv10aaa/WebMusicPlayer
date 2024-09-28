function SongLoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-[30px] w-[30px] border-b-2 border-gray-400"></div>
    </div>
  );
}

export default SongLoadingIndicator;

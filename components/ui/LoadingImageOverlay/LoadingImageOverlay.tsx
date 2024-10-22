const LoadingImageOverlay = ({ progress }: { progress: number }) => {
  return (
    <div
      className="absolute bottom-0 w-full backdrop-blur-3xl"
      style={{ height: `calc(${100 - progress}%)` }}
    ></div>
  );
};

export default LoadingImageOverlay;

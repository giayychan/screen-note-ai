const Divider = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`w-0.5 h-auto bg-black bg-opacity-10 ${className}`}></div>
  );
};

export default Divider;

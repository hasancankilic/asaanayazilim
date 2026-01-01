"use client";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
      <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-8">
            <div className="h-16 w-16 bg-white/10 rounded-xl mb-4"></div>
            <div className="h-6 bg-white/10 rounded-lg w-2/3 mb-2"></div>
            <div className="h-4 bg-white/10 rounded-lg w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded-lg w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;





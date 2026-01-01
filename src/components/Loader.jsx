import React from "react";

const CircleLoaders = () => {
  return (
    <div className="flex gap-2">
      <span className="size-3 animate-ping rounded-full bg-indigo-600"></span>
      <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]"></span>
      <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]"></span>
    </div>
  );
};

export default CircleLoaders;

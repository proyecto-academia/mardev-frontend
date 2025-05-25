import React from "react";
import ReactPlayer from "react-player";

export default function  VideoPlayer({ videoUrl })  {
  console.log("video player videoUrl:", videoUrl);
  return (
    <div className="video-container">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  );
};


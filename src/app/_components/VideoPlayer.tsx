"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import OptionButton from "./OptionButton";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/mastervideo.mp4");
  const [showOptions, setShowOptions] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [timerStarted, setTimerStarted] = useState(false);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoSrc, isPlaying]);

  useEffect(() => {
    const playbackStarted = () => {
      if (!timerStarted) {
        setTimerStarted(true);
        const optionsTimer = setTimeout(() => {
          setShowOptions(true);
        }, 26000);

        const playButtonTimer = setTimeout(() => {
          setShowPlayButton(false);
        }, 2000);

        return () => {
          clearTimeout(optionsTimer);
          clearTimeout(playButtonTimer);
        };
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("play", playbackStarted);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", playbackStarted);
      }
    };
  }, [timerStarted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOptionButtonClick = (videoPath: string) => {
    setVideoSrc(videoPath);
    setShowOptions(false);
  };

  return (
    <div
      className="relative outline h-[300px] w-[500px] group"
      onMouseEnter={() => setShowPlayButton(true)}
      onMouseLeave={() => setShowPlayButton(false)}
    >
      <video ref={videoRef} className="h-full w-full object-cover">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={handlePlayPause}
        className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-opacity duration-500 ${
          showPlayButton ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {showOptions && (
        <>
          <div className="absolute w-5 h-5 flex items-center justify-center bottom-[210px] left-[80px] outline outline-white cursor-pointer -translate-x-1/2 bg-red-600 hover:bg-red-600/70 text-white p-3 rounded-full transition-colors">
            <OptionButton
              text="1"
              videoUrl="/video1.mp4"
              onClick={handleOptionButtonClick}
            />
          </div>
          <div className="absolute w-5 h-5 flex items-center justify-center bottom-[160px] left-[170px] outline outline-white cursor-pointer -translate-x-1/2 bg-green-800 hover:bg-green-800/70 text-white p-3 rounded-full transition-colors">
            <OptionButton
              text="2"
              videoUrl="/video2.mp4"
              onClick={handleOptionButtonClick}
            />
          </div>
          <div className="absolute w-5 h-5 flex items-center justify-center bottom-[180px] left-[250px] outline outline-white cursor-pointer -translate-x-1/2 bg-yellow-800 hover:bg-yellow-800/70 text-white p-3 rounded-full transition-colors">
            <OptionButton
              text="3"
              videoUrl="/video3.mp4"
              onClick={handleOptionButtonClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;

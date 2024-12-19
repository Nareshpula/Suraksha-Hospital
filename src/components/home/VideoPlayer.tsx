import React, { useEffect, useRef, useState } from 'react';
import { VideoPlayerProps } from '../../types/video';
import { getBestVideoSource, getFallbackPoster, videoSources, fallbackVideoSources } from '../../services/videoService';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onLoadingChange, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [usingFallbackSources, setUsingFallbackSources] = useState(false);
  const { isSlowConnection } = useNetworkStatus();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let mounted = true;
    let playAttempts = 0;
    const MAX_PLAY_ATTEMPTS = 3;

    const tryPlay = async () => {
      try {
        await video.play();
        if (mounted) {
          onLoadingChange(false);
        }
      } catch (error) {
        console.error('Play attempt failed:', error);
        playAttempts++;
        
        if (playAttempts < MAX_PLAY_ATTEMPTS) {
          setTimeout(tryPlay, 1000);
        } else {
          handleError();
        }
      }
    };

    const handleCanPlay = () => {
      if (!mounted) return;
      tryPlay();
    };

    const handleError = () => {
      if (!mounted) return;
      console.error('Video error:', video.error?.message || 'Unknown error');
      
      if (!usingFallbackSources) {
        // Switch to fallback sources
        setUsingFallbackSources(true);
        setCurrentSourceIndex(0);
      } else if (currentSourceIndex < fallbackVideoSources.length - 1) {
        setCurrentSourceIndex(prev => prev + 1);
      } else {
        onError();
      }
    };

    const handleStalled = () => {
      if (!mounted) return;
      console.error('Video stalled');
      handleError();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);

    // Set initial source based on connection speed
    const sources = usingFallbackSources ? fallbackVideoSources : videoSources;
    const selectedSource = isSlowConnection ? sources[sources.length - 1] : sources[currentSourceIndex];
    video.src = selectedSource.url;
    video.load();

    return () => {
      mounted = false;
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.src = '';
      video.load();
    };
  }, [onLoadingChange, onError, currentSourceIndex, usingFallbackSources, isSlowConnection]);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      playsInline
      autoPlay
      muted
      loop
      crossOrigin="anonymous"
      preload="auto"
      poster={getFallbackPoster()}
    >
      {(usingFallbackSources ? fallbackVideoSources : videoSources).map((source, index) => (
        <source
          key={index}
          src={source.url}
          type={source.type}
        />
      ))}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
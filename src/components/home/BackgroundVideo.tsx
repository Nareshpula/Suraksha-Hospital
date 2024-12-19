import React, { useState, useEffect } from 'react';
import AppointmentSection from './AppointmentSection';
import VideoPlayer from './VideoPlayer';
import FallbackImage from './FallbackImage';
import WelcomeText from './WelcomeText';

const BackgroundVideo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const MAX_RETRIES = 2;

  const handleError = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: number;
    if (retryCount > 0 && retryCount < MAX_RETRIES) {
      timeoutId = window.setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [retryCount]);

  // Function to trigger welcome text animation
  const triggerWelcomeAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  // Expose the animation trigger to window for global access
  useEffect(() => {
    (window as any).triggerWelcomeAnimation = triggerWelcomeAnimation;
    return () => {
      delete (window as any).triggerWelcomeAnimation;
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      {/* Fallback Image */}
      <FallbackImage show={isLoading || hasError} />

      {/* Video Background */}
      {!hasError && (
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <VideoPlayer
            onLoadingChange={setIsLoading}
            onError={handleError}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-transparent"></div>

      {/* Content */}
      <WelcomeText key={animationKey} />

      {/* Appointment Section */}
      <AppointmentSection />
    </div>
  );
};

export default BackgroundVideo;
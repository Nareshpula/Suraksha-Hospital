import { VideoSource } from '../types/video';

export const videoSources: VideoSource[] = [
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/748800251/rendition/720p/file.mp4?loc=external&signature=2bf4a90e4e534cc2f0709e6753cd72f93f633653df5b431d89eece3ad2b0c321',
    quality: '720p',
    type: 'video/mp4'
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/748800251/rendition/540p/file.mp4?loc=external&signature=2bf4a90e4e534cc2f0709e6753cd72f93f633653df5b431d89eece3ad2b0c321',
    quality: '540p',
    type: 'video/mp4'
  }
];

export const fallbackVideoSources: VideoSource[] = [
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/748800251/rendition/360p/file.mp4?loc=external&signature=2bf4a90e4e534cc2f0709e6753cd72f93f633653df5b431d89eece3ad2b0c321',
    quality: '360p',
    type: 'video/mp4'
  }
];

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1559721853-0da6e4b92d8e?auto=format&fit=crop&q=80&w=1920';

export const getFallbackPoster = () => FALLBACK_POSTER;

export const getBestVideoSource = (connection: any): VideoSource => {
  if (!connection || connection.downlink >= 5) {
    return videoSources[0]; // High quality for fast connections
  } else if (connection.downlink >= 2) {
    return videoSources[1]; // Medium quality for moderate connections
  }
  return fallbackVideoSources[0]; // Low quality for slow connections
};
export interface VideoSource {
  url: string;
  quality: string;
  type: string;
}

export interface VideoPlayerProps {
  onLoadingChange: (isLoading: boolean) => void;
  onError: () => void;
}
const imageCache = new Map<string, string>();

export const optimizeImageUrl = (url: string, options: {
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp';
} = {}) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const {
    width = 800,
    quality = 75,
    format = 'auto'
  } = options;

  const optimizedUrl = `${url}?auto=${format}&fit=crop&q=${quality}&w=${width}`;
  imageCache.set(cacheKey, optimizedUrl);
  
  return optimizedUrl;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map(preloadImage));
};
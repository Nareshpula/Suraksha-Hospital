const imageCache = new Map<string, string>();
const maxCacheSize = 100;

export const cacheImage = (key: string, url: string) => {
  if (imageCache.size >= maxCacheSize) {
    const firstKey = imageCache.keys().next().value;
    imageCache.delete(firstKey);
  }
  imageCache.set(key, url);
};

export const getCachedImage = (key: string) => {
  return imageCache.get(key);
};

export const clearImageCache = () => {
  imageCache.clear();
};
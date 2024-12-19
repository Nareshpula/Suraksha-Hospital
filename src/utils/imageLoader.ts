import { imageConfig } from './imageConfig';

const imageCache = new Map<string, HTMLImageElement>();

export const preloadImage = async (src: string, options: { priority?: 'high' | 'low' } = {}): Promise<void> => {
  if (!src) return Promise.resolve();
  if (imageCache.has(src)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      resolve(); // Resolve instead of reject to prevent cascade failures
    };

    const quality = options.priority === 'high' ? 
      imageConfig.quality.high : 
      imageConfig.quality.medium;

    img.srcset = getImageSrcSet(src);
    img.sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw';
    img.src = `${src}?auto=format&fit=crop&q=${quality}&w=${imageConfig.sizes.medium}`;
    img.loading = options.priority === 'high' ? 'eager' : 'lazy';
    img.decoding = 'async';
  });
};

export const preloadImages = async (urls: string[], options: { priority?: 'high' | 'low' } = {}): Promise<void[]> => {
  if (!urls || !Array.isArray(urls)) return Promise.resolve([]);
  
  return Promise.all(
    urls.filter(url => url) // Filter out any null/undefined URLs
       .map(url => preloadImage(url, options)
         .catch(err => {
           console.warn(`Failed to preload image: ${url}`, err);
           return Promise.resolve(); // Prevent cascade failures
         })
       )
  );
};

export const getImageSrcSet = (url: string) => {
  if (!url) return '';
  
  return Object.entries(imageConfig.sizes)
    .map(([_, size]) => `${url}?auto=format&fit=crop&q=${imageConfig.quality.high}&w=${size} ${size}w`)
    .join(', ');
};

export const clearImageCache = () => imageCache.clear();
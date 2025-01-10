const imageCache = new Map<string, string>();
const preloadQueue = new Set<string>();
const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  },
  { rootMargin: '50px' }
);

export const optimizeImageUrl = (url: string, options: {
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  priority?: 'high' | 'low';
  sizes?: string;
} = {}): { src: string; srcset: string; sizes: string } => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const {
    width = options.priority === 'high' ? 1920 : 800,
    quality = options.priority === 'high' ? 85 : 75,
    format = 'auto',
    sizes = options.sizes || '100vw'
  } = options;

  // Generate srcset for responsive images
  const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
  const srcset = widths
    .filter(w => w <= width)
    .map(w => `${url}?auto=${format}&fit=crop&q=${quality}&w=${w} ${w}w`)
    .join(', ');

  const optimizedUrl = {
    src: `${url}?auto=${format}&fit=crop&q=${quality}&w=${width}`,
    srcset,
    sizes
  };

  imageCache.set(cacheKey, optimizedUrl);

  // Preload high priority images
  if (options.priority === 'high' && !preloadQueue.has(url)) {
    preloadQueue.add(url);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedUrl.src;
    document.head.appendChild(link);
  }
  
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
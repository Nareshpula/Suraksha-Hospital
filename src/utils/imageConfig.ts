export const imageConfig = {
  quality: {
    high: 85,
    medium: 75,
    low: 60
  },
  sizes: {
    thumbnail: 400,
    small: 800,
    medium: 1280,
    large: 1920,
    xlarge: 2560
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
} as const;

export const getImageDimensions = (aspectRatio: string): { width: number; height: number } => {
  const [width, height] = aspectRatio.split(':').map(Number);
  return { width, height };
};

export const calculateAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};
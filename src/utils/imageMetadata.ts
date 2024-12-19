interface ImageMetadata {
  priority: 'high' | 'low';
  dimensions?: {
    width: number;
    height: number;
  };
}

const imageMetadataCache = new Map<string, ImageMetadata>();

export const preloadImageWithMetadata = async (src: string): Promise<ImageMetadata> => {
  if (imageMetadataCache.has(src)) {
    return imageMetadataCache.get(src)!;
  }

  // Define high-priority images (e.g., hero images, logos)
  const highPriorityPatterns = [
    'photo-1492725764893-90b379c2b6e7', // Father Holding Baby
    'photo-1609220136736-443140cffec6', // Mother and Child
    'photo-1531983412531-1f49a365ffed', // Family Together
    'photo-1516627145497-ae6968895b74'  // Mother and Baby Bonding
  ];

  const metadata: ImageMetadata = {
    priority: highPriorityPatterns.some(pattern => src.includes(pattern)) ? 'high' : 'low'
  };

  imageMetadataCache.set(src, metadata);
  return metadata;
};

export const clearMetadataCache = () => {
  imageMetadataCache.clear();
};
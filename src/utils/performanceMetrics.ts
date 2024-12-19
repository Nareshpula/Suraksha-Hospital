export const measurePerformance = (metricName: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      console.debug(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  };
};

export const trackResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  const imageResources = resources.filter(r => r.initiatorType === 'img');
  
  const metrics = {
    totalImages: imageResources.length,
    averageLoadTime: imageResources.reduce((acc, r) => acc + r.duration, 0) / imageResources.length
  };

  console.debug('[Resource Timing]', metrics);
  return metrics;
};
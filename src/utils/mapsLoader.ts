import { Loader } from '@googlemaps/js-api-loader';

const RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRIES = 3;

export class MapsLoader {
  private static instance: MapsLoader;
  private loader: Loader;
  private loadPromise: Promise<typeof google> | null = null;
  private retryCount = 0;

  private constructor() {
    this.loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places']
    });
  }

  private async retryLoad(): Promise<typeof google> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await this.loader.load();
      } catch (error) {
        lastError = error as Error;
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }
    
    throw lastError || new Error('Failed to load Google Maps');
  }

  public static getInstance(): MapsLoader {
    if (!MapsLoader.instance) {
      MapsLoader.instance = new MapsLoader();
    }
    return MapsLoader.instance;
  }

  public async load(): Promise<typeof google> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = this.retryLoad();

    return this.loadPromise;
  }
}

export default MapsLoader;
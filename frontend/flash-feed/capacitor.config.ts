import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.newsbird.app',
  appName: 'News Birdy',
  webDir: 'dist/flash-feed/browser',

  server: {
    url: 'https://news-birdy.vercel.app',
    cleartext: true
  }
};

export default config;

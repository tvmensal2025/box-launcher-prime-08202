import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.d120bccb11ae4d19bdab3098dc47255c',
  appName: 'box-launcher-prime',
  webDir: 'dist',
  server: {
    url: 'https://d120bccb-11ae-4d19-bdab-3098dc47255c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;

export const SMS_CONFIG = {
  FAST2SMS_API_KEY: 'OCAs6aBlJY4er89QZDjpIvXTkqbxKugWNdGwSHfMnmctoLE0y1XalLBSPQeqvG1rnshto84uFDjOyiVb',
  FAST2SMS_BASE_URL: 'https://www.fast2sms.com/dev/bulkV2',
  OTP_EXPIRY_SECONDS: 60,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  isDev: import.meta.env.VITE_DEV_MODE === 'true'
};
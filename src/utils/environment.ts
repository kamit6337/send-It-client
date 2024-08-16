const environment = {
  SENTRY_DSN: import.meta.env.VITE_APP_SENTRY_DSN,
  SERVER_URL: import.meta.env.VITE_APP_SERVER_URL,
  CLIENT_URL: import.meta.env.VITE_APP_CLIENT_URL,
  GT4_MEASUREMENT_ID: import.meta.env.VITE_APP_GT4_MEASUREMENT_ID,
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,
  AWS_S3_BUCKET: import.meta.env.VITE_APP_AWS_S3_BUCKET,
};

export default environment;

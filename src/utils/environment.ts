const environment = {
  SENTRY_DSN: import.meta.env.VITE_APP_SENTRY_DSN,
  SERVER_URL: import.meta.env.VITE_APP_SERVER_URL,
  GT4_MEASUREMENT_ID: import.meta.env.VITE_APP_GT4_MEASUREMENT_ID,
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,
};

export default environment;

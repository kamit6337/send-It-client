// global.d.ts
declare global {
  interface Window {
    env: {
      VITE_APP_SERVER_URL?: string;
      VITE_APP_NODE_ENV?: string;
      VITE_APP_CLIENT_URL?: string;
    };
  }
}

// This is required to make the file a module
export {};

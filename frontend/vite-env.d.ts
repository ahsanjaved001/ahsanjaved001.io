/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CREDLY_API_TOKEN: string;
  readonly VITE_CREDLY_USER_ID: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
